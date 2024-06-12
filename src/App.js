import {
  ChakraProvider,
  Heading,
  Container,
  Text,
  Input,
  Button,
  Wrap,
  Stack,
  Image,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

const App = () => {
  const [image, updateImage] = useState();
  const [prompt, updatePrompt] = useState("");
  const [loading, updateLoading] = useState(false);
  const [file, setFile] = useState(null);

  const generate = async () => {
    updateLoading(true);

    const formData = new FormData();
    formData.append("prompt", prompt);
    if (file) {
      formData.append("file", file);
    }
    // http://127.0.0.1:8000/
    const result = await axios.post("https://7b03-35-193-93-169.ngrok-free.app", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    updateImage(result.data);
    updateLoading(false);
  };

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <ChakraProvider>
      <Container
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        padding="20px"
        maxW="container.md"
      >
        <Heading whiteSpace="nowrap">
          GenerativeVision: Image generation using stable diffusion🚀
        </Heading>
        <Text marginBottom={"10px"} marginTop={"60px"}>
          GenerativeVision is an image generation tool that uses artificial intelligence to create images from text descriptions or modify existing images.
          The site leverages the Stable Diffusion model, which is a powerful latent diffusion model that can produce high-quality images.
          Users can either upload an image or provide a text description, and the tool will generate a new image based on their input.
        </Text>

        <Wrap marginBottom={"10px"} justify="center">
          <Input
            value={prompt}
            onChange={(e) => updatePrompt(e.target.value)}
            width={"350px"}
            marginBottom="10px"
            placeholder="Enter prompt here."
          />
          <Button onClick={generate} colorScheme={"yellow"}>
            Generate
          </Button>
        </Wrap>

        <div
          {...getRootProps()}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "5px",
            width: "100%",
            maxWidth: "350px",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          <input {...getInputProps()} />
          <Text>
            {file
              ? `Selected file: ${file.name}`
              : "Drag and drop an image here, or click to select one"}
          </Text>
        </div>
        <Container>
          {loading ? (
            <Stack>
              <SkeletonCircle />
              <SkeletonText />
            </Stack>
          ) : image ? (
            <Image src={`data:image/png;base64,${image}`} boxShadow="lg" />
          ) : null}
        </Container>
      </Container>
    </ChakraProvider>
  );
};

export default App;
