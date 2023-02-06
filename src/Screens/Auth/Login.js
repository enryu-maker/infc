import React from 'react'
import InputForm from '../../Component/FormInput'
import TextButton from '../../Component/TextButton'
import { COLORS, FONTS } from '../../Theme/Theme'
import useMediaQuery from '../../utils/useMediaQuery'
import { IMAGES } from '../../Theme/Image'
import { Helmet } from 'react-helmet-async';
import Loading from 'react-loading'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { Login_Function } from '../../Store/actions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const Login = () => {
  const matches = useMediaQuery('(max-width:820px)')
  const mobile = useMediaQuery('(min-width:600px)')
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [check, setCheck] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const dispatch = useDispatch()

  function isEnableSignIn() {
    return email !== "" && password !== "";
  }
  async function login() {

    if (isEnableSignIn()) {
      setLoading(true);

      await axios
        .post(
          process.env.REACT_APP_BASE_URL + "/login/",
          {
            email: email,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            dispatch(Login_Function(response.data.access))
            setLoading(false);
          } else {
            setLoading(false);

          }
        })
        .catch((error) => {
          if (error.response) {
            setLoading(false);
          }
        });
    } else {
      toast.error('Invalid Input',
        { position: toast.POSITION.TOP_CENTER })
      setLoading(false);

    }
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      justifyContent: "center",
      width: "100%",
      alignItems: "center",
      backgroundColor: COLORS.Primary,

    }} >
      <Helmet>
        <title>INFC : Login</title>
        <link rel="canonical" href="http://localhost:3000/" />
      </Helmet>
      <img src={IMAGES.logo} alt="logo" style={{
        alignSelf: "center",
        height: !mobile ? 150 : matches ? "48%" : "250px",
        width: !mobile ? 150 : matches ? "48%" : "250px",
        // paddingBlock:20
      }} />
      <div style={{
        display: "flex",
        flexDirection: "column",
        width: '100%',
        height: !mobile ? "50%" : matches ? "40%" : "500px",
        justifyContent: "space-evenly",
        // paddingBottom:!mobile?null:100

      }}>
        <InputForm
          value={email}
          label={"E-Mail"}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <InputForm
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          label={"Password"}
          type={"password"}
        />
        {/* <div style={{
                    display: "flex",
                    flexDirection: "row",
                    width: !mobile ? "88%" : matches ? "58%" : "400px",
                    alignItems: "center",
                    justifyContent: "space-between",
                    alignSelf: "center"

                }}>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <button style={{
                            height: 18,
                            width: 18,
                            backgroundColor: check ? COLORS.transparentPrimary : COLORS.white,
                            borderWidth: 1.5,
                            borderColor: COLORS.white,
                            borderStyle: "solid"
                            // margin:check?5:0,
                        }}
                            onClick={() => {
                                setCheck(!check)
                            }}
                        />
                        <p style={{
                            ...FONTS.h3,
                            color: COLORS.white
                        }}>&nbsp;Remember me</p>
                    </div>
                    <p style={{
                        ...FONTS.h3,
                        color: COLORS.white
                    }}>Forget Password?</p>
                </div> */}
        {
          loading ?
            <Loading type="spin" color={COLORS.white} height={20} width={20} />
            :
            <TextButton label={"SIGN IN"}
              onPress={login}
            />
        }

      </div>
      <ToastContainer />
    </div>
  )
}