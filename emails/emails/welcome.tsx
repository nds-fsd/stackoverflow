import {
  Body,
  Button,
  Container,
  Head, Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text
} from '@react-email/components';
import * as React from "react";


export const WelcomeEmail = ({url}) => (
  <Html>
    <Head />
    <Preview>Welcome to Devvit</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Heading>Welcome to Devvit!</Heading>
          <Hr style={hr} />
          <Text style={paragraph}>
          Visit our website and start empowering the world to develop technology through collective knowledge.
          </Text>
          <Button style={button} href={`${url}/dashboard`}>
            Make your first question
          </Button>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const box = {
  padding: "0 48px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const paragraph = {
  color: "#525f7f",
  fontSize: "18px",
  lineHeight: "24px",
};


const button = {
  backgroundColor: "#7e3aed",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center",
  display: "block",
  width: "100%",
  padding: "10px",
};