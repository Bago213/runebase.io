import runebase from 'runebasejs-lib'
import bip39 from 'bip39'
import ledger from './ledger.js'
import server from './server.js'
import config from './config.js'
import buffer from 'buffer'

const unit = 'RUNEBASE'
let network = {}
switch (config.getNetwork())
{
  case 'testnet':
    network = runebase.networks.runebase_testnet
    break
  case 'mainnet':
    network = runebase.networks.runebase
    break
}

export default class Wallet {
  constructor(keyPair, extend = {}) {
    this.keyPair = keyPair
    this.extend = extend
    this.info = {
      address: this.getAddress(),
      balance: 'loading',
      unconfirmedBalance: 'loading',
      qrc20: [],
    }
    this.txList = []
  }

  validateMnemonic(mnemonic, password) {
    let tempWallet = Wallet.restoreFromMnemonic(mnemonic, password)
    return this.keyPair.toWIF() === tempWallet.keyPair.toWIF()
  }

  getAddress() {
    return this.keyPair.getAddress()
  }

  getHasPrivKey() {
    return !!this.keyPair.d
  }

  getPrivKey() {
    try {
      return this.keyPair.toWIF()
    } catch (e) {
      if (e.toString() === 'Error: Missing private key') {
        return null
      } else {
        throw e
      }
    }
  }

  init() {
    if (config.getMode() !== 'offline') {
      this.setInfo()
      this.setQrc20()
      this.setTxList()
    }
  }

  async setInfo() {
    const info = await server.currentNode().getInfo(this.info.address)
    this.info.balance = info.balance + unit
    this.info.unconfirmedBalance = info.unconfirmedBalance + unit
  }

  async setQrc20() {
    this.info.qrc20 = await server.currentNode().getQrc20(this.info.address)
  }

  async setTxList() {
    this.txList = await server.currentNode().getTxList(this.info.address)
  }

  async generateCreateContractTx(code, gasLimit, gasPrice, fee) {
    return Wallet.generateCreateContractTx(this, code, gasLimit, gasPrice, fee, await server.currentNode().getUtxoList(this.info.address))
  }

  async generateSendToContractTx(contractAddress, encodedData, gasLimit, gasPrice, fee) {
    return await Wallet.generateSendToContractTx(this, contractAddress, encodedData, gasLimit, gasPrice, fee, await server.currentNode().getUtxoList(this.info.address))
  }

  async generateTx(to, amount, fee) {
    return await Wallet.generateTx(this, to, amount, fee, await server.currentNode().getUtxoList(this.info.address))
  }

  async sendRawTx(tx) {
    const res = await Wallet.sendRawTx(tx)
    this.init()
    return res
  }

  async callContract(address, encodedData) {
    return await Wallet.callContract(address, encodedData)
  }

  static generateCreateContractTx(wallet, code, gasLimit, gasPrice, fee, utxoList) {
    return runebase.utils.buildCreateContractTransaction(wallet.keyPair, code, gasLimit, gasPrice, fee, utxoList)
  }

  static async generateSendToContractTx(wallet, contractAddress, encodedData, gasLimit, gasPrice, fee, utxoList) {
    if (!wallet.getHasPrivKey()) {
      if (wallet.extend.ledger) {
        return await ledger.generateSendToContractTx(wallet.keyPair, wallet.extend.ledger.ledger, wallet.extend.ledger.path, wallet.info.address, contractAddress, encodedData, gasLimit, gasPrice, fee, utxoList, server.currentNode().fetchRawTx)
      }
    }
    return runebase.utils.buildSendToContractTransaction(wallet.keyPair, contractAddress, encodedData, gasLimit, gasPrice, fee, utxoList)
  }

  static async generateTx(wallet, to, amount, fee, utxoList) {
    if (!wallet.getHasPrivKey()) {
      if (wallet.extend.ledger) {
        return await ledger.generateTx(wallet.keyPair, wallet.extend.ledger.ledger, wallet.extend.ledger.path, wallet.info.address, to, amount, fee, utxoList, server.currentNode().fetchRawTx)
      }
    }
    return runebase.utils.buildPubKeyHashTransaction(wallet.keyPair, to, amount, fee, utxoList)
  }

  static async sendRawTx(tx) {
    return await server.currentNode().sendRawTx(tx)
  }

  static async callContract(address, encodedData) {
    return await server.currentNode().callContract(address, encodedData)
  }

  static validateBip39Mnemonic(mnemonic) {
    return bip39.validateMnemonic(mnemonic)
  }

  static restoreFromMnemonic(mnemonic, password) {
    //if (bip39.validateMnemonic(mnemonic) == false) return false
    const seedHex = bip39.mnemonicToSeedHex(mnemonic, password)
    const hdNode = runebase.HDNode.fromSeedHex(seedHex, network)
    const account = hdNode.deriveHardened(88).deriveHardened(0).deriveHardened(0)
    const keyPair = account.keyPair
    return new Wallet(keyPair)
  }

  static restoreFromMobile(mnemonic) {
    const seedHex = bip39.mnemonicToSeedHex(mnemonic)
    const hdNode = runebase.HDNode.fromSeedHex(seedHex, network)
    const account = hdNode.deriveHardened(88).deriveHardened(0)
    const walletList = []
    for (let i = 0; i < 10; i++) {
      const wallet = new Wallet(account.deriveHardened(i).keyPair)
      wallet.setInfo()
      walletList[i] = {
        wallet,
        path: i
      }
    }
    return walletList
  }

  static restoreFromWif(wif) {
    return new Wallet(runebase.ECPair.fromWIF(wif, network))
  }

  static async restoreHdNodeFromLedgerPath(ledger, path) {
    const res = await ledger.runebase.getWalletPublicKey(path)
    const compressed = ledger.runebase.compressPublicKey(buffer.Buffer.from(res['publicKey'], 'hex'))
    const keyPair = new runebase.ECPair.fromPublicKeyBuffer(compressed, network)
    const hdNode = new runebase.HDNode(keyPair, buffer.Buffer.from(res['chainCode'], 'hex'))
    hdNode.extend = {
      ledger: {
        ledger,
        path
      }
    }
    return hdNode
  }

  static restoreFromHdNodeByPage(hdNode, start, length = 10) {
    const walletList = []
    const extend = hdNode.extend
    for (let i = start; i < length + start; i++) {
      const wallet = new Wallet(hdNode.derive(i).keyPair, extend)
      wallet.setInfo()
      walletList[i] = {
        wallet,
        path: i
      }
    }
    return walletList
  }

  static generateMnemonic() {
    return bip39.generateMnemonic()
  }

  static async connectLedger() {
    return await ledger.connect()
  }

  static getLedgerDefaultPath() {
    return ledger.defaultPath
  }
}
