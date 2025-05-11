# main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from web3 import Web3
import json

app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Загружаем ABI и Bytecode из папки contracts
with open("../contracts/abi.json", "r") as f:
    abi = json.load(f)

with open("../contracts/bytecode.txt", "r") as f:
    bytecode = f.read().strip()

# Приватный ключ (НЕ ПУБЛИКУЙТЕ ЕГО)
PRIVATE_KEY = "922ddcd1d919bf297c1feb74084f6e8b600c4514d1582091a5266d00ba3088c3"

# Рабочие тестовые сети
POLYGON_URL = "https://rpc-mumbai.maticvigil.com"  # Polygon Mumbai Testnet
BSC_URL = "https://data-seed-prebsc-1-s1.binance.org:8545/"  # BSC Testnet

def deploy_contract(web3):
    account = web3.eth.account.from_key(PRIVATE_KEY)
    contract = web3.eth.contract(abi=abi, bytecode=bytecode)
    nonce = web3.eth.get_transaction_count(account.address)
    
    tx = contract.constructor().build_transaction({
        "from": account.address,
        "nonce": nonce,
        "gas": 3000000,
        "gasPrice": web3.to_wei("20", "gwei"),
    })
    
    signed_tx = web3.eth.account.sign_transaction(tx, private_key=PRIVATE_KEY)
    tx_hash = web3.eth.send_raw_transaction(signed_tx.raw_transaction)
    tx_receipt = web3.eth.wait_for_transaction_receipt(tx_hash)
    
    return tx_receipt.contractAddress

@app.post("/deploy/{chain}")
def deploy(chain: str):
    if chain == "polygon":
        web3 = Web3(Web3.HTTPProvider(POLYGON_URL))
    elif chain == "bsc":
        web3 = Web3(Web3.HTTPProvider(BSC_URL))
    else:
        return {"error": "Unsupported chain"}

    try:
        address = deploy_contract(web3)
        return {"address": address}
    except Exception as e:
        return {"error": str(e)}
