import { Body, Button, Container, Head, Heading, Hr, Html, Preview, renderWhiteSpace, Section, Text } from '@react-email/components';
import * as React from 'react';

export const WelcomeEmail = ({ url }) => (
  <Html>
    <Head />
    <Preview>Welcome to Devvit</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Heading style={title}>Welcome to Devvit!</Heading>
          <Hr style={hr} />
          <Text style={paragraph}>
            Visit our website and start empowering the world to develop technology through collective knowledge.
          </Text>
          <Text style={paragraph}>
          We’re thrilled to have you join our community of programmers. Here’s how you can get started:
          </Text>
          <Button style={button} href={`${url}/dashboard`}>
            Ask Questions
          </Button>
          <Button style={button} href={`${url}/dashboard`}>
            Answer Questions
          </Button>

          <Button style={button} href={`${url}/dashboard`}>
            Explore Topics
          </Button>
          <Text style={paragraph}>
          Need help? Contact us at devvitnuclio@gmail.com  or check out our help section</Text>
          <Text style={paragraph}>
         Happy coding!
         </Text>
         <Text style={paragraph}>
         The Devvit Team
         </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;

const main = {
  backgroundColor: '#000000',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#000000',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const title = {
  color: '#fff',
  fontSize: "35px",
  marginBottom: '20px',
};

const box = {
  padding: '0 48px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const paragraph = {
  color: '#fff',
  fontSize: '18px',
  lineHeight: '24px',
  margin: '15px 15px', 
  lineHeight: '28px', 
  margin: '20px 0', 
};

const button = {
  backgroundColor: '#7e3aed',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'block',
  width: '100%',
  padding: '10px',
  marginBottom: '17px',
  
};

