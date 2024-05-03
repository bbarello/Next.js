import React, { useState } from 'react'
import { branding, OnfsHelpPopup, OnfsButton, OnfsHeader, OnfsInput} from 'onfsspacommon'
import { BiPrinter } from 'react-icons/bi'
import Joi from 'joi'


const PolicyViewHeader = (props) =>{

  const {
    getPolicyInfoFunction,
    custLastName = '[Missing]',
    custFirstName = '[Missing]',
    policyNumber,
    policyType = '[Missing]',
    policyNickname,
    policyStatus = '[Missing]',
    initialHelpPolicyTopic,
    initialHelpPolicyText,
    initialAdditionalHelpPolicyText,
    additionalHelpPolicyLink,
    initialHelpStatusText,
    initialHelpStatusTopic,
    initialAdditionalHelpStatusTextArray,
    additionalHelpStatusLinkArray,
  } = props

  const doSubmit = () => {
    console.log("hello")
    //submit call here to backend
  }

  const [testPolicyNumber, setTestPolicyNumber] = useState(policyNumber)
  const [showPolicyHelp, setShowPolicyHelp] = useState('hidden')
  const [showStatusHelp, setShowStatusHelp] = useState('hidden')
  const statusHelpRef = React.useRef(null)

  const policyHelpRef = React.useRef(null)


  return (
    <>
      <OnfsHelpPopup showHelp={showPolicyHelp} setShowHelp={setShowPolicyHelp} initialHelpTopic={initialHelpPolicyTopic} initialHelpText={initialHelpPolicyText} initialAdditionalHelpText={initialAdditionalHelpPolicyText}  additionalHelpLink = {additionalHelpPolicyLink} helpRef = {policyHelpRef} />

      <OnfsHelpPopup
        showHelp={showStatusHelp}
        setShowHelp={setShowStatusHelp}
        initialHelpTopic={initialHelpStatusTopic}
        initialHelpText={initialHelpStatusText}
        initialAdditionalHelpMultiTextArray={initialAdditionalHelpStatusTextArray}
        additionalHelpMultiLinkArray={additionalHelpStatusLinkArray}
        helpRef = {statusHelpRef}      />

      <div
        style={{
          marginLeft: '1em',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          display: 'flex'
        }}
      >
        <span style={{ marginRight: 'auto' }}>

          <span style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            display: 'flex'
          }} >
            <OnfsButton
              className={showPolicyHelp==='visible'? 'helpLinkClicked': 'helpLink'}
              ref = {policyHelpRef}
              onClick={() => setShowPolicyHelp('visible')}
              style={{
                color: branding.colors.black,
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '30px'
              }}
              link
              label={`Policy Number ${policyNumber ?? "[Missing]"}`}
            />


          <OnfsButton
            style={{
              color: (policyStatus==='Active' || policyStatus==='Pending' || policyStatus === 'GracePeriod') ?branding.colors.black: '#FFF',
              fontWeight: 'bold',
              fontSize: '12px',
              lineHeight: '13px',
              height: '20px',
              marginLeft: '12px',
              padding: '2px 1em',
              marginTop:'4px',
              background: (policyStatus ==='Active')? '#4CA410':(policyStatus === 'Pending')? '#FAA614': (policyStatus==='Grace Period')? '#F76902': '#952791',
              borderRadius: '10px'
            }}
            className={showStatusHelp==='visible'? 'helpLinkClicked': 'helpLink'}
            ref = {statusHelpRef}
            onClick={() => setShowStatusHelp('visible')}
            label={policyStatus}
          />
          </span>
          <span style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            display: 'flex'
          }} >
              <OnfsHeader
                size={'custom'}
                label={policyNickname}
                style={{fontSize: '30px', lineHeight: '42px', color: branding.colors.black, fontWeight: 400, margin:0, width: 'unset'}}
              />

              <OnfsHeader
                size={'custom'}
                label={policyType}
                style={{fontSize: '20px', lineHeight: '30px', fontWeight: 300, color:branding.colors.black, marginLeft: '10px', marginTop: '5px'}}
              />
          </span>


          {/*    <span>*/}
          {/*      STATUS:{' '}*/}

          {/*    </span>*/}
          {/*  </p>*/}
          {/*</span>*/}
            </span>

        <span style={{ marginRight: '2em' }}>
          <br />
          <BiPrinter /> <a> Printer Friendly </a>
          <OnfsInput label={'For test only policy number'} name={'policyNumber'} handleChange={(input) => setTestPolicyNumber(input.value)}/>
          <OnfsButton label={'Submit'} onClick={()=>getPolicyInfoFunction(testPolicyNumber)}/>
        </span>
      </div>
    </>
  )
}

export default PolicyViewHeader;
