import React from 'react'
import {branding, OnfsButton, OnfsHeader} from 'onfsspacommon'

const PolicyViewHelp = (props) => {
  const {
    show,
    setShow,
    helpTopic,
    helpText,
    additionalHelpText,
    additionalHelpLink,
    additionalHelpMultiTextArray,
    additionalHelpMultiLinkArray,
    backButtonFunc
  } = props

  const [helpLinkWasClicked, setHelpLinkWasClicked] = React.useState(false);
  return (
    <div
      style={{
        visibility: show,
      }}
    >
      <div
        style={{backgroundColor: 'rgba(0,0,0,.35)',
          zIndex: 8,
          width: '100%',
          height: '100%',
          position: 'absolute'
        }}
        onClick={() => {setShow('hidden')}}/>

      <div
        style={{
          backgroundColor: branding.colors.blue,
          color: branding.colors.white,
          position: "absolute",
          borderRadius: "5pt",
          zIndex: 9,
          outline: 'solid 1pt',
          display: 'flex',
          width: '50%',
          maxHeight: '20em',
          boxShadow: '5px 10px #888888',
          fontSize: '14pt',
          lineHeight: '20pt',
          top: props.yPosition, //set top after box-shadow because the shadow itself pushes things up by the shadow height!
          left: props.xPosition,
        }}
      >
        <div
          style={{
            marginLeft: '1em',
            marginRight: '1em',
            marginBottom: '1em',
            marginTop: '10px',
            width: '100%'
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline'
            }}
          >
            <OnfsHeader size='custom' style={{ fontSize: '15px', lineHeight: '17px', fontWeight: 'bold', color: branding.colors.white }} label={helpTopic} />

          </div>
          <div style={{ overflowY: 'auto', maxHeight: '20em', fontSize: '14px'}}>
            <p style={{ whiteSpace: 'pre-wrap'}}>{helpText}</p>
            {additionalHelpText ? (
              <p>
                {' '}
                Click{' '}
                <a href={'#'} onClick={()=>{additionalHelpLink(); setHelpLinkWasClicked(true) }}
                   style={{color:branding.colors.white,fontWeight:700}}>
                  here
                </a>{' '}
                for {additionalHelpText}
              </p>
            ) : null}
            {additionalHelpMultiTextArray && additionalHelpMultiLinkArray ? (
              <>
                <p>{additionalHelpMultiTextArray[0]}</p>
                {additionalHelpMultiTextArray.slice(1).map((text, idx) => {
                  return (
                    <p>
                      <a href={'#'} onClick={()=>{additionalHelpMultiLinkArray[idx](); setHelpLinkWasClicked(true)}}
                         style={{color:branding.colors.white,fontWeight:700}}>

                        {text}
                      </a>
                    </p>
                  )
                })}
              </>
            ) : null}

          </div>

          {!helpLinkWasClicked ? null :
            <div
              style={{display:'flex', justifyContent:'end'}}>
              <OnfsButton
                label='Back '
                onClick={()=> {backButtonFunc(); setHelpLinkWasClicked(false)}}
                style={{marginRight: '1em'}}
              />
            </div>
          }

        </div>
      </div>
    </div>
  )
}

export default PolicyViewHelp;
