import React, { useState, useEffect } from "react";
import Footer from "../landing/footer/Footer";
import Navbar from "../landing/header/Navbar";
import "./settings.scss";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../hooks/loader";
import { useHistory } from "react-router-dom";
import { getFactoryContract } from "../../utils/contractHelpers";
import Environment from "../../utils/Environment";
import { useWeb3React } from "@web3-react/core";
import { API_URL } from "../../utils/ApiUrl";
import { useCallback } from "react";
import useWeb3 from "../../hooks/useWeb3";
// import { InputSharp } from "@material-ui/icons";
import { ColorPicker } from "@progress/kendo-react-inputs";
// import { SketchPicker,BlockPicker } from "react-color";

const Settings = () => {
  const [blockPickerColor, setBlockPickerColor] = useState("#111111");
  const [headerBg, setheaderBg] = useState("#000");
  const [headerTitle, setheaderTitle] = useState("#000");
  const [headerDetail, setheaderDetail] = useState("#000");
  const [accentColor, setAccentColor] = useState("#000");
  const [footerBg, setFooterBg] = useState("#000");
  const [footerText, setFooterText] = useState("#000");
  const [bodyColor, setBodyColor] = useState("#000");
  const [poolCard, setPoolCard] = useState("#000");
  const token11 = localStorage.getItem("mytoken");
  const [poolCardPrimary, setPoolCardPrimary] = useState("#000");
  const [poolCardSecondary, setPoolCardSecondary] = useState("#000");
  const history = useHistory();
  const [mainLoader, setMainLoader] = useState(false);
  const web3 = useWeb3();
  const { account } = useWeb3React();
  const [id, setId] = useState();
  const [token1, settoken1] = useState();
  const [token, settoken] = useState();
  const [MySetting, setMySetting] = useState({
    accentColor: "",
    bodyColor: "",
    footerBackgroundColor: "",
    footerTextColor: "",
    headerBackGroundColor: "",
    headerDetailText: "",
    headerDetailTextColor: "",
    headerTitleText: "",
    headerTitleTextColor: "",
    poolCardColor: "",
    poolCardPrimeryTextColor: "",
    poolCardSecondaryTextColor: "",
    projectLogo: "",
    projectName: "",
    logoTextColor: "",
    buttonTextColor: "",
    // socialLogo: [' ']
  });
  // console.log("accesnt color ", MySetting?.accentColor)
  const [MyFiles, setMyFiles] = useState();
  const [MyFiles1, setMyFiles1] = useState([]);
  const [isBNB, setisBNB] = useState({
    StakingTokenName: "Binance Coin",
    StakingTokenSymbol: "BNB",
    StakingTokenAddress: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    StakingTokenDecimals: "18",
  });
  const [inputs, setInputs] = useState({
    projectName: "",
    headerTitle: "",
    headerdetail: "",
    twitterUrl: "",
    linkedinUrl: "",
    discorUrl: "",
    instaUrl: "",
    mediumUrl: "",
    telegramUrl: "",
  });
  // const [sketchPickerColor, setSketchPickerColor] = useState({
  //   r: "241",
  //   g: "112",
  //   b: "19",
  //   a: "1",
  // });
  // const selectedColor = 'rgba(237, 126, 50, 1)';
  const gradientSettings = {
    opacity: false,
  };
  console.log("inputsss", inputs);
  const [productdetail, setproductdetail] = useState([
    {
      url: "",
      socialLogo: "",
      imagefile: "",
    },
  ]);
  const handleInputChange1 = (e, index) => {
    console.log("index we have", index);
    const { name, value } = e.target;
    const list = [...productdetail];
    list[index][name] = value;
    setproductdetail(list);
  };
  console.log("list data we have here is", MySetting);

  const handleRemoveClick1 = (index) => {
    const list = [...productdetail];
    list.splice(index, 1);
    setproductdetail(list);
  };
  const handleAddClick1 = () => {
    setproductdetail([
      ...productdetail,
      {
        url: "",
        socialLogo: "",
        imagefile: "",
      },
    ]);
  };
  const handleInputchange1 = (e) => {
    console.log("target", e.value);
    const value = e.value;
    setMySetting((MySetting) => ({ ...MySetting, accentColor: value }));
  };
  const handleInputchange2 = (e) => {
    console.log("target", e.value);
    const value = e.value;
    setMySetting((MySetting) => ({
      ...MySetting,
      headerBackGroundColor: value,
    }));
  };
  const handleInputchange3 = (e) => {
    console.log("target", e.value);
    const value = e.value;
    setMySetting((MySetting) => ({
      ...MySetting,
      headerTitleTextColor: value,
    }));
  };
  const handleInputchange4 = (e) => {
    console.log("target", e.value);
    const value = e.value;
    setMySetting((MySetting) => ({
      ...MySetting,
      headerDetailTextColor: value,
    }));
  };
  const handleInputchange5 = (e) => {
    console.log("target", e.value);
    const value = e.value;
    setMySetting((MySetting) => ({
      ...MySetting,
      footerBackgroundColor: value,
    }));
  };
  const handleInputchange6 = (e) => {
    console.log("target", e.value);
    const value = e.value;
    setMySetting((MySetting) => ({ ...MySetting, footerTextColor: value }));
  };
  const handleInputchange7 = (e) => {
    console.log("target", e.value);
    const value = e.value;
    setMySetting((MySetting) => ({ ...MySetting, bodyColor: value }));
  };
  const handleInputchange8 = (e) => {
    console.log("target", e.value);
    const value = e.value;
    setMySetting((MySetting) => ({ ...MySetting, poolCardColor: value }));
  };
  const handleInputchange9 = (e) => {
    console.log("target", e.value);
    const value = e.value;
    setMySetting((MySetting) => ({
      ...MySetting,
      poolCardPrimeryTextColor: value,
    }));
  };
  const handleInputchange10 = (e) => {
    console.log("target", e.value);
    const value = e.value;
    setMySetting((MySetting) => ({
      ...MySetting,
      poolCardSecondaryTextColor: value,
    }));
  };

  const handleInputchange11 = (e) => {
    console.log("target", e.value);
    const value = e.value;
    setMySetting((MySetting) => ({
      ...MySetting,
      logoTextColor: value,
    }));
  };

  const handleInputchange12 = (e) => {
    console.log("target", e.value);
    const value = e.value;
    setMySetting((MySetting) => ({
      ...MySetting,
      buttonTextColor: value,
    }));
  };

  console.log("package name", inputs);

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const handletoken = (evt) => {
    if (evt.target.files) {
      const filesarray = Array.from(evt.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      settoken(filesarray);
      // Array.from(evt.target.files).map((file) => URL.createObjectURL(file))
    }
    var files = evt.target.files;
    var file = files[0];
    setMyFiles(file);
  };
  console.log("argggginputssss", MyFiles);
  // console.log("argggginputssssbnb", isBNB);

  const handletoken11 = (evt, index) => {
    // console.log("sjjsjssjlskjk");
    if (evt.target.files) {
      var filesarray = evt.target.files[0];
      var url = URL.createObjectURL(filesarray);

      settoken1(url);
      // Array.from(evt.target.files).map((file) => URL.createObjectURL(file))
      // var abc = URL.createObjectURL(file)
    }
    var files = evt.target.files;
    var file = files[0];

    // const { value } = evt.target;

    const list = [...productdetail];
    const list1 = [...productdetail];
    list[index].socialLogo = url;
    list1[index].imagefile = file;
    setMyFiles1(list1);
    setproductdetail(list);
    console.log("sdbsbdhsbdhjsdbjdsbjsbdc", list);
    console.log("sdbsbdhsbdhjsdbjdswew..,.,.,.,bdc", list1);
  };

  const CreatePool = async () => {
    setMainLoader(true);
    const data1 = new FormData();
    let images = [];
    let url = [];
    // for (let i = 0; i < productdetail?.length; i++) {
    //   // let toPush = { ...productdetail[i] }
    //   // let image = { ...productdetail[i] }
    //   // image.title = productdetail[i].title
    //   // toPush.name = productdetail[i].title
    //   // images.push(productdetail[i].imagefile);
    //   if(productdetail[i].imagefile){
    //     data1.append("socialLogo", productdetail[i].imagefile);
    //   }
    //   url.push(productdetail[i].url);;
    // }
    try {
      data1.append("projectName", inputs.projectName);
      if (MyFiles) {
        data1.append("projectLogo", MyFiles);
      }
      data1.append("accentColor", MySetting.accentColor);
      data1.append("headerBackGroundColor", MySetting.headerBackGroundColor);
      data1.append("headerTitleText", inputs.headerTitle);
      data1.append("headerDetailTextColor", MySetting.headerDetailTextColor);
      data1.append("headerDetailText", inputs.headerdetail);
      data1.append("headerTitleTextColor", MySetting.headerTitleTextColor);
      data1.append("footerBackgroundColor", MySetting.footerBackgroundColor);
      data1.append("footerTextColor", MySetting.footerTextColor);
      data1.append("bodyColor", MySetting.bodyColor);
      data1.append("poolCardColor", MySetting.poolCardColor);
      data1.append(
        "poolCardPrimeryTextColor",
        MySetting.poolCardPrimeryTextColor
      );
      data1.append(
        "poolCardSecondaryTextColor",
        MySetting.poolCardSecondaryTextColor
      );

      data1.append("logoTextColor", MySetting.logoTextColor);
      data1.append("buttonTextColor", MySetting.buttonTextColor);

      data1.append("twitterUrl", inputs.twitterUrl);
      data1.append("linkedinUrl", inputs.linkedinUrl);
      data1.append("discorUrl", inputs.discorUrl);
      data1.append("instaUrl", inputs.instaUrl);
      data1.append("mediumUrl", inputs.mediumUrl);
      data1.append("telegramUrl", inputs.telegramUrl);
      // data1.append("url", JSON.stringify(url));

      console.log("apppr", data1);
      axios
        .post(`${API_URL}/v1/project/createProjectDetails`, data1, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          setMainLoader(false);
          toast.success("Setting Updated Successfully", {
            position: "top-center",
            autoClose: 3000,
          });
          getSetting();
          // history.push('/landing');
          // singleprojectdetail()
        })
        .catch((err) => {
          setMainLoader(false);
        });
    } catch (err) {
      console.log("approve err", err);
      throw err;
    }
  };

  const getSetting = () => {
    setMainLoader(true);
    axios
      .get(`${API_URL}/v1/project/getAllProjectDetails`, {
        headers: { Authorization: `Bearer ${token11}` },
      })
      .then((response) => {
        console.log("resss123", response.data.data[0]);
        setMySetting(response.data.data[0]);
        settoken(response.data.data[0].projectLogo);
        let dumObj = inputs;
        let dumobjj1 = productdetail;
        dumObj.projectName = response.data.data[0].projectName;
        dumObj.headerTitle = response.data.data[0].headerTitleText;
        dumObj.headerdetail = response.data.data[0].headerDetailText;
        dumObj.instaUrl = response.data.data[0].instaUrl;
        dumObj.discorUrl = response.data.data[0].discorUrl;
        dumObj.twitterUrl = response.data.data[0].twitterUrl;
        dumObj.mediumUrl = response.data.data[0].mediumUrl;
        dumObj.telegramUrl = response.data.data[0].telegramUrl;
        setInputs(dumObj);
        // dumobjj1.title = response.data.data[0].url[0];
        // dumobjj1.imageurl = response.data.data[0].socialLogo[0];
        setproductdetail(response.data.data[0].socialAttributes);
        setMainLoader(false);
        // bodyColor(response.data.data[0]?.bodyColor)
        // setPoolCardSecondary(response.data.data[0]?.poolCardSecondaryTextColor)
        // setPoolCardPrimary(response.data.data[0]?.poolCardPrimeryTextColor)
        // setPoolCard(response.data.data[0]?.poolCardColor)
        // setAccentColor(response.data.data[0]?.accentColor)
        // setheaderBg(response.data.data[0]?.headerBackGroundColor)
        // setheaderTitle(response.data.data[0]?.headerTitleTextColor)
        // setheaderDetail(response.data.data[0]?.headerDetailTextColor)
        // setFooterBg(response.data.data[0]?.footerBackgroundColor)
        // setFooterText(response.data.data[0]?.footerTextColor)
        // setOpen(false)
      })
      .catch((err) => {
        setMainLoader(false);
        toast.error(err.response?.data.msg, {
          position: "top-center",
          autoClose: 2000,
        });
      });
  };

  useEffect(() => {
    getSetting();
  }, [token11]);
  useEffect(()=>{
    let token = localStorage.getItem('mytoken')
    if(token){
    }else{
      history.push('/')
    }
  },[])
  return (
    <>
      {mainLoader && <Loader />}
      <Navbar />
      <section className="settings">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-11 col-12 m-auto">
              <div className="staking-token box-shadow">
                <div className="heading">
                  <h6>Project Theme</h6>
                  <img
                    src=".\assests\line.svg"
                    alt="img"
                    className="img-fluid"
                  />
                </div>
                <div className="row">
                  <div className="col-xl-8 col-12">
                    <div className="input-field">
                      <p>Project Name</p>
                      <input
                        type="text"
                        name="projectName"
                        value={inputs.projectName}
                        placeholder="Enter Body Text"
                        onChange={handleChange1}
                        className="input-create"
                      />
                    </div>
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-12 padd-l">
                        <div className="input-field">
                          <p>Accent Color</p>
                          <ColorPicker
                            name="accentColor"
                            value={MySetting?.accentColor}
                            view={"gradient"}
                            onChange={(event) => handleInputchange1(event)}
                            gradientSettings={gradientSettings}
                          />
                          <input
                            type="text"
                            name="accentColor"
                            placeholder="#000000"
                            defaultValue={MySetting?.accentColor}
                            className="input-create"
                          />
                        </div>
                        <div className="input-field">
                          <p>Header Title Text</p>
                          <input
                            type="text"
                            name="headerTitle"
                            value={inputs.headerTitle}
                            onChange={handleChange1}
                            placeholder="Enter Title Text"
                            className="input-create"
                          />
                          {/* <SketchPicker
                            onChange={(color) => {
                              setSketchPickerColor(color.hex);
                            }}
                            color={sketchPickerColor}
                          /> */}
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-12 padd-r">
                        <div className="input-field">
                          <p>Header Background Color</p>
                          <ColorPicker
                            value={MySetting?.headerBackGroundColor}
                            view={"gradient"}
                            onChange={(event) => handleInputchange2(event)}
                            gradientSettings={gradientSettings}
                          />
                          <input
                            type="text"
                            value={MySetting?.headerBackGroundColor}
                            placeholder="#000000"
                            className="input-create"
                          />
                        </div>
                        <div className="input-field">
                          <p>Header Title Text Color</p>
                          <div className="inner-input1">
                            <ColorPicker
                              value={MySetting?.headerTitleTextColor}
                              view={"gradient"}
                              onChange={(event) => handleInputchange3(event)}
                              gradientSettings={gradientSettings}
                            />
                          </div>
                          <input
                            type="text"
                            value={MySetting?.headerTitleTextColor}
                            placeholder="#000000"
                            className="input-create"
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-12 padd-l">
                        <div className="input-field">
                          <p>Header detail Text</p>
                          <input
                            type="text"
                            name="headerdetail"
                            value={inputs.headerdetail}
                            onChange={handleChange1}
                            placeholder="Enter Header detail Text"
                            className="input-create"
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-12 padd-r">
                        <div className="input-field">
                          <p>Header detail Text color</p>
                          <ColorPicker
                            value={MySetting?.headerDetailTextColor}
                            view={"gradient"}
                            onChange={(event) => handleInputchange4(event)}
                            gradientSettings={gradientSettings}
                          />
                          <input
                            type="text"
                            placeholder="#000000"
                            value={MySetting?.headerDetailTextColor}
                            className="input-create"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-12 padd-l">
                        <div className="input-field">
                          <p>Footer background color</p>
                          <ColorPicker
                            value={MySetting?.footerBackgroundColor}
                            view={"gradient"}
                            onChange={(event) => handleInputchange5(event)}
                            gradientSettings={gradientSettings}
                          />
                          <input
                            type="text"
                            placeholder="#000000"
                            value={MySetting?.footerBackgroundColor}
                            className="input-create"
                          />
                        </div>
                        <div className="input-field">
                          <p>Body color</p>
                          <div className="inner-input1">
                            <ColorPicker
                              value={MySetting?.bodyColor}
                              view={"gradient"}
                              onChange={(event) => handleInputchange7(event)}
                              gradientSettings={gradientSettings}
                            />
                          </div>
                          <input
                            type="text"
                            placeholder="#000000"
                            value={MySetting?.bodyColor}
                            className="input-create"
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-12 padd-r">
                        <div className="input-field">
                          <p>Footer text color</p>
                          <ColorPicker
                            value={MySetting?.footerTextColor}
                            view={"gradient"}
                            onChange={(event) => handleInputchange6(event)}
                            gradientSettings={gradientSettings}
                          />
                          <input
                            type="text"
                            placeholder="#000000"
                            value={MySetting?.footerTextColor}
                            className="input-create"
                          />
                        </div>
                        <div className="input-field">
                          <p>Pool card color</p>
                          <div className="inner-input1">
                            <ColorPicker
                              value={MySetting?.poolCardColor}
                              view={"gradient"}
                              onChange={(event) => handleInputchange8(event)}
                              gradientSettings={gradientSettings}
                            />
                          </div>
                          <input
                            type="text"
                            placeholder="#000000"
                            value={MySetting?.poolCardColor}
                            className="input-create"
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-12 padd-l">
                        <div className="input-field">
                          <p>Pool Card Primery text color</p>
                          <ColorPicker
                            value={MySetting?.poolCardPrimeryTextColor}
                            view={"gradient"}
                            onChange={(event) => handleInputchange9(event)}
                            gradientSettings={gradientSettings}
                          />
                          <input
                            type="text"
                            placeholder="#000000"
                            className="input-create"
                            value={MySetting?.poolCardPrimeryTextColor}
                          />
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-12 padd-r">
                        <div className="input-field">
                          <p>Pool Card Secondary text color</p>
                          <ColorPicker
                            // defaultValue={poolCardSecondary}
                            value={MySetting?.poolCardSecondaryTextColor}
                            view={"gradient"}
                            onChange={(event) => handleInputchange10(event)}
                            gradientSettings={gradientSettings}
                          />
                          <input
                            type="text"
                            placeholder="#000000"
                            value={MySetting?.poolCardSecondaryTextColor}
                            className="input-create"
                          />
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-12 padd-l">
                        <div className="input-field">
                          <p>Logo text color</p>
                          <ColorPicker
                            value={MySetting?.logoTextColor}
                            view={"gradient"}
                            onChange={(event) => handleInputchange11(event)}
                            gradientSettings={gradientSettings}
                          />
                          <input
                            type="text"
                            placeholder="#000000"
                            className="input-create"
                            value={MySetting?.logoTextColor}
                          />
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-12 padd-r">
                        <div className="input-field">
                          <p>Button text color</p>
                          <ColorPicker
                            // defaultValue={poolCardSecondary}
                            value={MySetting?.buttonTextColor}
                            view={"gradient"}
                            onChange={(event) => handleInputchange12(event)}
                            gradientSettings={gradientSettings}
                          />
                          <input
                            type="text"
                            placeholder="#000000"
                            value={MySetting?.buttonTextColor}
                            className="input-create"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-12 col-12">
                    <div className="input-field project-box">
                      <p>Project Logo</p>
                      <div className="upload" onChange={handletoken}>
                        {/* <label htmlFor="after-upload">
                          <img
                            src=".\assests\upload-img.png"
                            alt="img"
                            className="img-fluid upload-img"
                          />
                        </label> */}
                        <label htmlFor="tokenLogo" >
                          {token ? (
                            <img
                              src={token}
                              alt="img"
                              className="img-fluid upload-img"
                            />
                          ) : (
                            <img
                              src=".\assests\upload.svg"
                              alt="img"
                              className="img-fluid upload-img"
                            />
                          )}
                        </label>
                        <input
                          id="tokenLogo"
                          name="name"
                          type="file"
                          placeholder="Enter pool name "
                          className="input-create d-none"
                        />
                        {/* <input
                          id="after-upload"
                          type="file"
                          placeholder="Enter pool name "
                          className="input-create d-none"
                        /> */}
                      </div>
                      <div className="text">
                        <p>
                          Logo Size: <span>38x38 px</span>
                        </p>
                        <p>
                          File Format: <span>PNG, SVG</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="other-detail box-shadow">
                <div className="heading">
                  <h6>Social Links</h6>
                  <img
                    src=".\assests\line.svg"
                    alt="img"
                    className="img-fluid"
                  />
                </div>
                <div className="row">
                  <div className="col-xl-8 col-12 ">
                    <div class="form-group">
                      <div className="App">
                        <div className="box dchvdbch">
                          <div className="field">
                            <div className="form-group input-field">
                              <p>Telegram URL</p>
                              <input
                                maxLength={200}
                                name="telegramUrl"
                                placeholder="Social Link"
                                className="input-create"
                                value={inputs.telegramUrl}
                                autoComplete="off"
                                onChange={(e) => handleChange1(e)}
                              />
                            </div>

                            <label htmlFor={`file`} className="btn-upload-logo">
                              <img
                                src="/assests/telegram.png"
                                alt="img"
                                className="img-fluid upload-img-url"
                              />
                            </label>
                          </div>
                        </div>
                        <div className="box ">
                          <div className="field">
                            <div className="form-group input-field">
                              <p>Medium URL</p>
                              <input
                                maxLength={200}
                                name="mediumUrl"
                                placeholder="Social Link"
                                className="input-create"
                                value={inputs.mediumUrl}
                                autoComplete="off"
                                onChange={(e) => handleChange1(e)}
                              />
                            </div>

                            <label htmlFor={`file`} className="btn-upload-logo">
                              <img
                                src="/assests/medium.png"
                                alt="img"
                                className="img-fluid upload-img-url"
                              />
                            </label>
                          </div>
                        </div>
                        <div className="box dchvdbch">
                          <div className="field">
                            <div className="form-group input-field">
                              <p>Twitter URL</p>
                              <input
                                maxLength={200}
                                name="twitterUrl"
                                placeholder="Social Link"
                                className="input-create"
                                value={inputs.twitterUrl}
                                autoComplete="off"
                                onChange={(e) => handleChange1(e)}
                              />
                            </div>

                            <label htmlFor={`file`} className="btn-upload-logo">
                              <img
                                src="/assests/twitter.png"
                                alt="img"
                                className="img-fluid upload-img-url"
                              />
                            </label>
                          </div>
                        </div>
                        <div className="box dchvdbch">
                          <div className="field">
                            <div className="form-group input-field">
                              <p>Instagram URL</p>
                              <input
                                maxLength={200}
                                name="instaUrl"
                                placeholder="Social Link"
                                className="input-create"
                                value={inputs.instaUrl}
                                autoComplete="off"
                                onChange={(e) => handleChange1(e)}
                              />
                            </div>

                            <label htmlFor={`file`} className="btn-upload-logo">
                              <img
                                src="/assests/instagram.png"
                                alt="img"
                                className="img-fluid upload-img-url"
                              />
                            </label>
                          </div>
                        </div>
                        <div className="box dchvdbch">
                          <div className="field">
                            <div className="form-group input-field">
                              <p>Discord URL</p>
                              <input
                                maxLength={200}
                                name="discorUrl"
                                placeholder="Social Link"
                                className="input-create"
                                value={inputs.discorUrl}
                                autoComplete="off"
                                onChange={(e) => handleChange1(e)}
                              />
                            </div>

                            <label htmlFor={`file`} className="btn-upload-logo">
                              <img
                                src="/assests/discord.png"
                                alt="img"
                                className="img-fluid upload-img-url"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="btn-create">
                <button className="btn-yellow" onClick={CreatePool}>
                  Apply Changes
                </button>
                {/* <button className="btn-clear">Clear All</button> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Settings;
