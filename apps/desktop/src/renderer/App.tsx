import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { ChakraProvider, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from "@chakra-ui/react";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loginInfo, setLoginInfo] = useState(null);

  async function greet() {
    setGreetMsg(await invoke("greet", { name }));
  }

  function handleLogin() {
    // Logic to handle Weibo login
    // This should open the Weibo login page in an iframe or new window
    // After login, capture the callback and store login info
  }

  return (
    <ChakraProvider>
      <div className="container">
        

        <Button onClick={() => setIsModalOpen(true)}>Login</Button>

        {/* Chakra UI Modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Login to Weibo</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Button onClick={handleLogin}>Login with Weibo</Button>
            </ModalBody>
          </ModalContent>
        </Modal>


        <form
          className="row"
          onSubmit={(e) => {
            e.preventDefault();
            greet();
          }}
        >
          <input
            id="greet-input"
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Enter a name..."
          />
          <button type="submit">Greet</button>
        </form>

        <p>{greetMsg}</p>
      </div>
    </ChakraProvider>
  );
}

export default App;
