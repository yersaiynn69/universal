from solcx import compile_standard, install_solc
import json

# Установить нужную версию компилятора (например, 0.8.0)
install_solc("0.8.0")

# Чтение контракта Storage.sol
with open("Storage.sol", "r") as file:
    storage_file = file.read()

# Компиляция контракта
compiled_sol = compile_standard(
    {
        "language": "Solidity",
        "sources": {
            "Storage.sol": {
                "content": storage_file
            }
        },
        "settings": {
            "outputSelection": {
                "*": {
                    "*": ["abi", "evm.bytecode"]
                }
            }
        },
    },
    solc_version="0.8.0",
)

# Сохранение ABI
with open("abi.json", "w") as file:
    json.dump(compiled_sol["contracts"]["Storage.sol"]["Storage"]["abi"], file)

# Сохранение Bytecode
bytecode = compiled_sol["contracts"]["Storage.sol"]["Storage"]["evm"]["bytecode"]["object"]
with open("bytecode.txt", "w") as file:
    file.write(bytecode)

