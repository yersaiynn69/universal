from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from web3 import Web3
import os
from dotenv import load_dotenv
import json

load_dotenv()

app = FastAPI()

# CORS (разрешаем подключение с фронтенда)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Загружаем ABI и Bytecode
with open("abi.json", "r") as f:
    abi = json.load(f)

with open("bytecode.txt", "r") as f:
    bytecode = f.read().strip()  # Удаляем пробелы и переносы строк

# .env переменные
PRIVATE_KEY = os.getenv("PRIVATE_KEY")
INFURA_URL = os.getenv("INFURA_URL")
POLYGON_URL = os.getenv("POLYGON_URL")

# Функция деплоя контракта
def deploy_contract(web3):
    account = web3.eth.account.from_key(PRIVATE_KEY)
    contract = web3.eth.contract(abi=abi, bytecode=bytecode)

    nonce = web3.eth.get_transaction_count(account.address)
    tx = contract.constructor().build_transaction({
        "from": account.address,
        "nonce": nonce,
        "gas": 3000000,
        "gasPrice": web3.to_wei("50", "gwei"),
    })

    signed_tx = web3.eth.account.sign_transaction(tx, private_key=PRIVATE_KEY)
    tx_hash = web3.eth.send_raw_transaction(signed_tx.raw_transaction)

    tx_receipt = web3.eth.wait_for_transaction_receipt(tx_hash)
    return tx_receipt.contractAddress

@app.post("/deploy/{chain}")
def deploy(chain: str):
    if chain == "ethereum":
        web3 = Web3(Web3.HTTPProvider(INFURA_URL))
    elif chain == "polygon":
        web3 = Web3(Web3.HTTPProvider(POLYGON_URL))
    else:
        return {"error": "Unsupported chain"}

    return {"address": deploy_contract(web3)}
