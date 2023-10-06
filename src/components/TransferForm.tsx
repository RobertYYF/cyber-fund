import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

export function TransferForm() {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    // 连接到 MetaMask
    const connectToMetaMask = async () => {
      if (window.ethereum) {
        try {
          // 请求用户授权
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          // 创建 Web3 实例
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);
        } catch (error) {
          console.error('Failed to connect to MetaMask:', error);
        }
      } else {
        console.error('MetaMask not found');
      }
    };

    connectToMetaMask();
  }, []);

  useEffect(() => {
    // 获取当前账户信息
    const fetchAccounts = async () => {
      if (web3) {
        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts);
      }
    };

    fetchAccounts();
  }, [web3]);

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();

    if (web3 && accounts.length > 0) {
      const sender = accounts[0];

      // 构建转账交易对象
      const transaction = {
        from: sender,
        to: recipient,
        value: web3.utils.toWei(amount, 'ether'),
      };

      try {
        // 发送交易
        await web3.eth.sendTransaction(transaction);
        console.log('Transaction sent successfully');
      } catch (error) {
        console.error('Failed to send transaction:', error);
      }
    }
  };

  return (
    <div>
      <h1>Transfer Form</h1>
      <form onSubmit={handleTransfer}>
        <label>
          Recipient Address:
          <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
        </label>
        <label>
          Amount:
          <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
        <button type="submit">Transfer</button>
      </form>
    </div>
  );
}