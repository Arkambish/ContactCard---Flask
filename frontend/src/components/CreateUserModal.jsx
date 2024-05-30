import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { BASE_URL } from "../App";

const CreateUserModal = ({ setUsers }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    role: "",
    description: "",
    gender: "",
  });

  const toast = useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (
        !inputs.name ||
        !inputs.role ||
        !inputs.description ||
        !inputs.gender
      ) {
        toast({
          status: "error",
          title: "Required",
          description: "Please fill all fields",
          duration: 2000,
          position: "top-center",
        });
        return;
      }
      const res = await fetch(BASE_URL + "/friends", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      toast({
        status: "success",
        title: "Yayy! 🎉",
        description: "Friend created successfully.",
        duration: 5000,
        position: "top-center",
      });
      onClose();
      setUsers((prev) => [...prev, data]);
      setInputs({
        name: "",
        role: "",
        description: "",
        gender: "",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Button onClick={onOpen}>
        <BiAddToQueue size={20} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit}>
          <ModalContent>
            <ModalHeader> My new BFF 😍 </ModalHeader>
            <ModalCloseButton />

            <ModalBody pb={6}>
              <Flex alignItems={"center"} gap={4}>
                {/* Left */}
                <FormControl>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    placeholder="John Doe"
                    value={inputs.name}
                    onChange={(e) =>
                      setInputs({ ...inputs, name: e.target.value })
                    }
                  />
                </FormControl>

                {/* Right */}
                <FormControl>
                  <FormLabel>Role</FormLabel>
                  <Input
                    placeholder="Software Engineer"
                    value={inputs.role}
                    onChange={(e) =>
                      setInputs({ ...inputs, role: e.target.value })
                    }
                  />
                </FormControl>
              </Flex>

              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={inputs.description}
                  onChange={(e) =>
                    setInputs({ ...inputs, description: e.target.value })
                  }
                  resize={"none"}
                  overflowY={"hidden"}
                  placeholder="He's a software engineer who loves to code and build things."
                />
              </FormControl>

              <RadioGroup mt={4}>
                <Flex gap={5}>
                  <Radio
                    value="male"
                    onChange={(e) =>
                      setInputs({ ...inputs, gender: e.target.value })
                    }
                  >
                    Male
                  </Radio>
                  <Radio
                    value="female"
                    onChange={(e) =>
                      setInputs({ ...inputs, gender: e.target.value })
                    }
                  >
                    Female
                  </Radio>
                </Flex>
              </RadioGroup>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                type="submit"
                isLoading={loading}
              >
                Add
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default CreateUserModal;
