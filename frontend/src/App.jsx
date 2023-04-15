import { useState,useEffect } from 'react'
import {ethers } from 'ethers';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button, Center ,Text} from '@chakra-ui/react'
import { Input , Stack} from '@chakra-ui/react'
import Wallet from '../../backend/artifacts/contracts/MsgToBlockchain.sol/MsgToBlockchain.json';

const walletAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';


function App() {
  const [message, setMessage] = useState();

  useEffect(() => {
    getMsgToBlockchain();
  }, [])

  async function requestAccount() {
    await window.ethereum.request({method: 'eth_requestAccounts'});
  }

  async function getMsgToBlockchain() {
    if(typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(walletAddress, Wallet.abi, provider);
      try {
        const data = await contract.getMessage();
        setMessage(data);
      }
      catch(err) {
        console.log(err);
      }
    }
  }

  async function setMsgToBlockchain() {
    if(!message) return 
    if(typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(walletAddress, Wallet.abi, signer);
      const transaction = await contract.setMessage(message);
      setMessage('');
      await transaction.wait();
      getMsgToBlockchain();
    }
  }

  return (
    <div className="App">
      <Center  h='100px' color='white'>
        <Stack spacing={10}>
          <Text>
            Your message is : {message}
          </Text>
          <Input placeholder='Your message here'
              onChange={e=> setMessage(e.target.value)}
          />
          <Button onClick={setMsgToBlockchain} >
            Send Message
          </Button>
        
        </Stack>
      </Center>
    </div>
  )
}

export default App
