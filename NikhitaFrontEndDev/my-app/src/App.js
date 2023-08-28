import './App.css';
import Home from './components/Home.js';
import styled from  'styled-components';

const Bkgrnd = styled.img`
  position: absolute;
`;
const Wrapper = styled.div`
width: 320px;
height: 497px;
flex-shrink: 0;
fill: var(--white, #FFF);
filter: drop-shadow(0px 25px 25px rgba(0, 0, 0, 0.05));
`
const Qrcode = styled.div`
width: 288px;
height: 288px;
flex-shrink: 0;
border-radius: 10px;
background: #2C7DFA;
position: relative;
margin: auto;
bottom: 24px;
margin-top: 16px;
`
const Text1 = styled.div`
display: flex;
width: 288px;
height: 129px;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 16px;
flex-shrink: 0;
margin: auto;
`
const Heading1 = styled.div`
color: var(--dark-navy, #1F314F);
text-align: center;
font-feature-settings: 'clig' off, 'liga' off;
width: 288px;
/* Heading */
font-family: Outfit;
font-size: 22px;
font-style: normal;
font-weight: 700;
line-height: normal;
`

const ParaText = styled.div`
color: var(--grey, #7D889E);
text-align: center;
font-feature-settings: 'clig' off, 'liga' off;
width: 256px;
/* Body */
font-family: Outfit;
font-size: 15px;
font-style: normal;
font-weight: 400;
line-height: normal;
letter-spacing: 0.188px;
`

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Bkgrnd src="Rectangle.png"/>
      <Wrapper>
        <Qrcode>
          <img style={{marginTop:64, width: 160, height: 160, flexShrink: 0}} src="qr-code.png"/>
        </Qrcode>
        <Text1>
          <Heading1>Improve your front-end skills by building projects</Heading1>
          <ParaText>Scan the QR code to visit Frontend Mentor and take your coding skills to the next level</ParaText>
        </Text1>
      </Wrapper>
      </header>
    </div>
  );
}


export default App;
