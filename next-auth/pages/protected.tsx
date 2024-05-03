import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Layout from "../components/layout"
import AccessDenied from "../components/access-denied"
import SampleComponent from '../components/dummyComponent/SampleComponent';
import PolicyViewHeader from '../components/header/PolicyViewHeader';


const ProtectedPage=() =>{
  const { data: session, status } = useSession()
  const loading = status === "loading"
  const [content, setContent] = useState()

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/examples/protected")
      const json = await res.json()
      if (json.content) {
        setContent(json.content)
      }
    }
    fetchData()
  }, [session])

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null

  // If no session exists, display access denied message
  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    )
  }

  // If session exists, display content
  return (
    <Layout>
      <h1>Protected Page</h1>
      <p>
        <strong>{content ?? "\u00a0"}</strong>
      </p>
    </Layout>
  )
}

export default function Page() {
  const components = new Map()
  components.set('sample component', <SampleComponent/>)
  // const authorizeEndpoint = process.env.REACT_APP_AUTH_ENDPOINT
  // const tokenEndpoint = process.env.REACT_APP_TOKEN_ENDPOINT
  // const clientId = process.env.REACT_APP_CLIENT_ID
  // const audience = process.env.REACT_APP_AUDIENCE
  //
  // const [jwtMsg, setJwtMsg] = useState(null)
  // const [idMsg, setIdMsg] = useState(null)
  //
  // const [jwt, jwtExpiration, refreshTokens, idToken] = useAuthCodeFlowPKCE(
  //   clientId,
  //   audience,
  //   authorizeEndpoint,
  //   tokenEndpoint
  // )
  // // Store decoded jwt when we get it
  // useEffect(() => {
  //   if (jwt) {
  //     const decodedJwt = jwtDecode(jwt)
  //     setJwtMsg(
  //       JSON.stringify(decodedJwt)
  //         .replace(/,/g, `,\n    `)
  //         .replace(/{/g, `{\n    `)
  //         .replace(/}/g, `\n}`)
  //     )
  //   }
  // }, [jwt])
  //
  // // Store decoded idToken when we get it
  // useEffect(() => {
  //   if (idToken) {
  //     const decodedIdToken = jwtDecode(idToken)
  //     setIdMsg(
  //       JSON.stringify(decodedIdToken)
  //         .replace(/,/g, `,\n    `)
  //         .replace(/{/g, `{\n    `)
  //         .replace(/}/g, `\n}`)
  //     )
  //   }
  // }, [idToken])
  // if (!jwt) {
  //   return <div>You are not logged in... About to redirect</div>
  // }


  const initialHelpPolicyTopic = 'Policy or Contract Number'

  const initialHelpPolicyText =
    'The policy or contract number is an Ohio National assigned number that is used to uniquely identify policies or contracts on Ohio National systems.'

  const initialAdditionalHelpPolicyText =
    ' for additional help on policy or contract number prefixes'

  const initialHelpStatusTopic =
    'Policy or Contract Status'

  const initialHelpStatusText =
    'The Policy or Contract Status indicates the present status of the policy, contract and/or application in our records.'

  const initialAdditionalHelpStatusTextArray =[
      'Click on the appropriate link to obtain detailed help.',
      'Status for Annuities',
      'Pending Life Policy Status',
      'Additional Policy or Contract Status'
    ]

  const [custLastName, setCustLastName] = useState('')
  const [custFirstName, setCustFirstName] = useState('')
  const [policyNickname, setPolicyNickname] = useState('')
  const [policyStatus, setPolicyStatus] = useState('')
  const [policyType, setPolicyType] = useState('')
  const [policyNumber, setPolicyNumber] = useState<any>('0000000')
  const [tabLayoutTree, setTabLayoutTree] = useState<any>(undefined)

  const getAndSetHeaderData = (policyNumber:string) =>{
    //make call here
    const data = {lastName: "Bond", firstName: "James", policyNickname: "BondPolicy", policyStatus: "Pending", policyType: "Variable Annuity Contract"}
    setPolicyNumber(policyNumber)
    setCustLastName(data.lastName)
    setCustFirstName(data.firstName)
    setPolicyNickname(data.policyNickname)
    setPolicyStatus(data.policyStatus)
    setPolicyType(data.policyType)
  }

  const getAndSetTabLayout = ()=>
  {

    //make call here
    const data =
        [{
          name: 'DASHBOARD',
          subTabs: [
            {
              children: 'Dashboard',
            }
          ],
        },
          {name: 'POLICY',
          subTabs: [
            {
              name: 'Coverage Info',
              children: 'Coverage Info'
            },{
              name: 'Billing Info',
              children: 'Billing Info'
            },{
              name: 'Bills',
              children: 'Bills'
            },{
              name: 'Notes',
              children: 'Notes'
            },
          ]},
          {name: 'TRANSACTIONS',
          subTabs:[{
            children: 'Transactions',
          }
          ]},
      {
        name: 'DOCUMENTS',

        icon: 'documents',

        subTabs: [
          {
            name: 'Policy Documents',

            children: 'Policy Documents'
          }
        ]
      },
          {
            name:'OWNER/REP',
            subTabs: [
              {
                name: 'Insured/Owner/Payor Info',
                children: 'Insured/Owner/Payor Info',
              }
            ]
          },
          {
            name:'QUESTIONS',
            subTabs: [
              {
                name:'AWD',
                children: 'AWD',
              },
              {
                name:'Surrender',
                children: 'Surrender',
              },
              {
                name:'Reinstatement',
                children: 'Reinstatement',
              },
              {
                name:'Modal Premium',
                children: 'Modal Premium',
              },
              {
                name:'Questions',
                children: 'Questions',
              }
            ]
          }
  ]
    const replacedTree = data
    data.forEach((toptab, toptabIdx) => {
      toptab.subTabs.forEach(
        (subtab, subtabIdx) =>
          (replacedTree[toptabIdx].subTabs[subtabIdx].children = components.get(
            subtab.children
          ))
      )
    })

    setTabLayoutTree(replacedTree)
      }


  useEffect(() =>{
    getAndSetHeaderData(policyNumber)
    getAndSetTabLayout();
  },)

  if(tabLayoutTree===undefined) {
    return (<div>loading</div>);
  }else{
  return (
    <div>
      <PolicyViewHeader
        custLastName={custLastName}
        custFirstName={custFirstName}
        policyNickname={policyNickname}
        policyStatus={policyStatus}
        policyType={policyType}
        policyNumber={policyNumber}
        getPolicyInfoFunction={getAndSetHeaderData}
        height='33px'
        initialHelpPolicyTopic={initialHelpPolicyTopic}
        initialHelpPolicyText={initialHelpPolicyText}
        initialAdditionalHelpPolicyText={initialAdditionalHelpPolicyText}
        additionalHelpPolicyLink={{
          'topic': 'Policy or Contract Number Alphabetic Prefix',
          'text':
            'The Alphabetic Prefix is a letter code used to indicate the company or line of business associated with the policy or contract. This alphabetic prefix must be used for policy inquiries. The valid policy prefixes are:\n\n' +
              'PREFIX\tMEANING\n' +
              '______________________________________________\n' +
              '1\t\tWhole Life\n' +
              '6\t\tTerm Life\n' +
              '117\t\tIndianapolis Life\n' +
              'A\t\tGroup Annuity Being Paid Out\n' +
              'B\t\tWhole Life (old Bankers Life Policies)\n' +
              'C\t\tWhole Life (old Columbia Life Policies)\n' +
              'C6\t\tUniversal Life\n' +
              'C85\t\tIndexed Universal Life\n' +
              'D\t\tOhio Public Deferred Compensation Program\n' +
              'E\t\tVariable Annuity\n' +
              'E12\t\tAny Variable Annuity issued since Feb. 16, 1996\n' +
              'E50\t\tVariable Annuity\n' +
              'E55\t\tVariable Annuity\n' +
              'E56\t\tSingle Premium Immediate Annuity\n' +
              'E58--59\t\tDisability Income\n' +
              'GA\t\tGroup Annuity\n' +
              'H\t\tDisability Income\n' +
              "H1\t\tDisability Income - Rate Book '95\n" +
              'H6\t\tDisability Income\n' +
              'I6\t\tVariable Universal Life (Since May 1996)\n' +
              'I9\t\tVariable Universal Life\n' +
              'M\t\tPenn National - Traditional\n' +
              'M1\t\tDisability Income formerly Penn National\n' +
              'M5\t\tUniversal Life (formerly Penn National)\n' +
              'P\t\tPension\n' +
              'S\t\tSettlement Certificate\n' +
              'S1\t\tChoice Annuities; Foundation Plus; ONdex fixed indexed annuity\n' +
              'S2\t\tChoice Annuities\n' +
              'S3\t\tCD Annuity\n' +
              'S301-S306\t\tChoice Annuity Promotions\n' +
              'S9\t\tSecurities America-Universal Life Client Company\n' +
              'SP\t\tAnnuity - Single Premium\n',
          'additionalHelpTextArray': null
        }}
        initialHelpStatusTopic={initialHelpStatusTopic}
        initialHelpStatusText={initialHelpStatusText}
        initialAdditionalHelpStatusTextArray={initialAdditionalHelpStatusTextArray}
        additionalHelpStatusLinkArray={[
        {'topic':'Status for Annuities',
          'text':
          'Issued\nPending in Error\nPending\nRejected',
          'additionalHelpTextArray': null
          },
          {'topic':'Pending Life Policy Status',
            'text':
              'The policy status indicates the present condition of the pending policy:\n\n\          Pass Admin Record\n          Underwriter Approved\n          Paid For/Not Taken/Cancelled\n          Decline\n          Incomplete\n          Mailed\n          Not Taken/Not Paid\n          Paid For\n          Pending\n          Postponed\n          Re-Approved\n          Reopen\n          Return to U/W Group\n          Re-Mailed\n          Return to Policy Change',
            'additionalHelpTextArray': null
          },
          {
            'topic':'Additional Policy or Contract Status',
            'text':
              'The policy status indicates the present condition of coverage.\n' +
                '          Active\n' +
                '          API Money After Issue\n' +
                '          API Money To CFO After Paid\n' +
                '          Applied For/Waiting\n' +
                '          Cancelled\n' +
                '          Death\n' +
                '          Death Claim Paid\n' +
                '          Death Claim Pending\n' +
                '          Decline\n' +
                '          Declined\n' +
                '          Disability\n' +
                '          Grace Period\n' +
                '          Inactive\n' +
                '          Incomplete\n' +
                '          Issued\n' +
                '          Lapse\n' +
                '          Lapse By Conversion\n' +
                '          Late Period Offer\n' +
                '          Mailed\n' +
                '          Matured or Expired\n' +
                '          Non-Forfeiture Option\n' +
                '          Not Taken\n' +
                '          Not Taken Not Paid\n' +
                '          Other (Immed Annuity), Other (Inc Imm Anty)\n' +
                '          Paid For, Paid-For\n' +
                '          Pass Admin Record\n' +
                '          PD-NT, Cancelled\n' +
                '          Pending\n' +
                '          Postponed\n' +
                '          Re-approved\n' +
                '          Rejected\n' +
                '          Re-mailed\n' +
                '          Reopen\n' +
                '          Replacement\n' +
                '          Rescinded\n' +
                '          Return To Pol Chg\n' +
                '          Return To U\\W\n' +
                '          Surrender Retained\n' +
                '          Surrendered\n' +
                '          Surrendered For Loan\n' +
                '          Transferred\n' +
                '          U\\W Approved',
            'additionalHelpTextArray':null
          }
        ]}

      />
    </div>
  )
}}
