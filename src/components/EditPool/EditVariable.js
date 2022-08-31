import React, { useEffect, useState } from "react";
import Footer from "../landing/footer/Footer";
import Navbar from "../landing/header/Navbar";
import Loader from "../../hooks/loader";
import axios from "axios";
import { toast } from "react-toastify";
import "./edit.scss";
import { useHistory } from "react-router-dom";
// import useWeb3 from "../useWeb3";
import {
  getFactoryVariableContract,
  vgetStakeBNBtoBNB,
  vgetStakeBNBtoToken,
  vgetStakeTokentoToken,
  vgetStakeTokentoBNB,
  getTokenApprove,
} from "../../utils/contractHelpers";
import Environment from "../../utils/Environment";
import { useWeb3React } from "@web3-react/core";
import { API_URL } from "../../utils/ApiUrl";
import { useCallback } from "react";
import useWeb3 from "../../hooks/useWeb3";
import { InputSharp } from "@material-ui/icons";

// const web3 = useWeb3();
const EditVariable = (props) => {
  const id = props.match.params.id;
  const [userDetail, setUserDetail] = useState();
  // console.log("idddd", id)
  const history = useHistory();
  const [mainLoader, setMainLoader] = useState(false);
  const [isLive, setIsLive] = useState();
  const [isLiveUnstake, setIsLiveUnstake] = useState();
  const web3 = useWeb3();
  const { account } = useWeb3React();
  const [token1, settoken1] = useState();
  const [token, settoken] = useState();
  const [MyFiles, setMyFiles] = useState();
  const [MyFiles1, setMyFiles1] = useState();
  const [apAmount, setApAmount] = useState();
  const [buttonEnable, setButtonEnable] = useState(true)
  const [isBNB, setisBNB] = useState({
    StakingTokenName: "Binance Coin",
    StakingTokenSymbol: "BNB",
    StakingTokenAddress: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    StakingTokenDecimals: "18",
  });

  const [inputs, setInputs] = useState({
    poolName: "",
    tokenBNB: false,
    StakingTokenName: "",
    StakingTokenSymbol: "",
    StakingTokenAddress: "",
    StakingTokenDecimals: "",
    rewardBNB: false,
    rewardTokenName: "",
    rewardTokenSymbol: "",
    rewardTokenAddress: "",
    rewardTokenDecimals: "",
    lockPeriod: "",
    ApyPerscentage: "",
    rewardWalletAddress: "",
    maxSupplyOfRewadPool: "",
    autoCompound: "",
    PreUnstaking: false,
    feeforPrematureUnstaking: "",
    penaltyReward: "",
    setData: "0",
    rewardPerBlock: '0'
  });
  const {
    feeforPrematureUnstaking,
    StakingTokenName,
    StakingTokenSymbol,
    StakingTokenAddress,
    StakingTokenDecimals,
    rewardTokenName,
    rewardTokenSymbol,
    rewardTokenAddress,
    rewardTokenDecimals,
  } = inputs;

  console.log("inputs fields =====>", userDetail);

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
    setButtonEnable(false)
  };

  const getdata = () => {
    setMainLoader(true);
    axios
      .post(`${API_URL}/v1/pool/getPoolById`, { _id: id })
      .then((response) => {
        setInputs(response?.data?.pool);
        setUserDetail(response?.data?.pool);
        console.log("data of all pool", response.data.pool);
        settoken(response?.data?.pool?.stakingTokenLogo);
        settoken1(response?.data?.pool?.rewardTokenLogo);
        setMainLoader(false);
      })
      .catch((err) => {
        setMainLoader(false);
        toast.error(err.response?.data.msg, {
          position: "top-center",
          autoClose: 2000,
        });
      });
  };

  const pauseStaking = async () => {
    setMainLoader(true);
    let contract = "";
    try {
      if (
        userDetail?.isStakingTokenBnb == true &&
        userDetail?.isRewardTokenBnb == true
      ) {
        // deployNewCollection = "createBnbForBnb";
        contract = vgetStakeBNBtoBNB(userDetail?.contractAddress, web3);
        console.log("BNBTOBNB");
      } else if (
        userDetail?.isStakingTokenBnb == true &&
        userDetail?.isRewardTokenBnb == false
      ) {
        contract = vgetStakeBNBtoToken(userDetail?.contractAddress, web3);
        console.log("BNBToToken");
      } else if (
        userDetail?.isStakingTokenBnb == false &&
        userDetail?.isRewardTokenBnb == true
      ) {
        contract = vgetStakeTokentoBNB(userDetail?.contractAddress, web3);
        console.log("TokenTOBNB");
      } else if (
        userDetail?.isStakingTokenBnb == false &&
        userDetail?.isRewardTokenBnb == false
      ) {
        contract = vgetStakeTokentoToken(userDetail?.contractAddress, web3);
        console.log("TokenTOTOken");
      }
      console.log("ressssss contra", contract);
      const res = await contract.methods
        .flipStakeState()
        .send({ from: account });
      console.log("pause STAKING", res);
      if (res) {
        setIsLive(res);
        setMainLoader(false);
      } else {
        setIsLive(res);
        setMainLoader(false);
      }
      console.log("resssss", res);
      // let total = parseInt(res)
    } catch (err) {
      setMainLoader(false);
      console.log("approve err", err);
      throw err;
    }
    setMainLoader(false);
  };

  const pauseUnStaking = async () => {
    setMainLoader(true);
    let contract = "";
    try {
      if (
        userDetail?.isStakingTokenBnb == true &&
        userDetail?.isRewardTokenBnb == true
      ) {
        // deployNewCollection = "createBnbForBnb";
        contract = vgetStakeBNBtoBNB(userDetail?.contractAddress, web3);
        console.log("BNBTOBNB");
      } else if (
        userDetail?.isStakingTokenBnb == true &&
        userDetail?.isRewardTokenBnb == false
      ) {
        contract = vgetStakeBNBtoToken(userDetail?.contractAddress, web3);
        console.log("BNBToToken");
      } else if (
        userDetail?.isStakingTokenBnb == false &&
        userDetail?.isRewardTokenBnb == true
      ) {
        contract = vgetStakeTokentoBNB(userDetail?.contractAddress, web3);
        console.log("TokenTOBNB");
      } else if (
        userDetail?.isStakingTokenBnb == false &&
        userDetail?.isRewardTokenBnb == false
      ) {
        contract = vgetStakeTokentoToken(userDetail?.contractAddress, web3);
        console.log("TokenTOTOken");
      }
      const res = await contract.methods
        .flipUnStakeState()
        .send({ from: account });
      console.log("pause UNSTAKING", res);
      if (res) {
        setIsLiveUnstake(res);
        setMainLoader(false);
      } else {
        setIsLiveUnstake(res);
        setMainLoader(false);
      }

      // let total = parseInt(res)
    } catch (err) {
      setMainLoader(false);
      console.log("approve err", err);
      throw err;
    }
  };

  const getpauseStatusStaking = async () => {
    let contract = "";
    if (
      userDetail?.isStakingTokenBnb == true &&
      userDetail?.isRewardTokenBnb == true
    ) {
      // deployNewCollection = "createBnbForBnb";
      contract = vgetStakeBNBtoBNB(userDetail?.contractAddress, web3);
      console.log("BNBTOBNB");
    } else if (
      userDetail?.isStakingTokenBnb == true &&
      userDetail?.isRewardTokenBnb == false
    ) {
      contract = vgetStakeBNBtoToken(userDetail.contractAddress, web3);
      console.log("BNBToToken");
    } else if (
      userDetail?.isStakingTokenBnb == false &&
      userDetail?.isRewardTokenBnb == true
    ) {
      contract = vgetStakeTokentoBNB(userDetail.contractAddress, web3);
      console.log("TokenTOBNB");
    } else if (
      userDetail?.isStakingTokenBnb == false &&
      userDetail?.isRewardTokenBnb == false
    ) {
      contract = vgetStakeTokentoToken(userDetail?.contractAddress, web3);
      console.log("TokenTOTOken");
    }

    console.log("ressssss contra", contract);
    const res = await contract.methods.isStakeActive().call();
    setIsLive(res);
    console.log("resssssabccc", res);

    // let total = parseInt(res)
  };

  const getpauseStatusUnStaking = async () => {
    // setMainLoader(true);
    let contract = "";
    if (
      userDetail?.isStakingTokenBnb == true &&
      userDetail?.isRewardTokenBnb == true
    ) {
      // deployNewCollection = "createBnbForBnb";
      contract = vgetStakeBNBtoBNB(userDetail?.contractAddress, web3);
      console.log("BNBTOBNB");
    } else if (
      userDetail?.isStakingTokenBnb == true &&
      userDetail?.isRewardTokenBnb == false
    ) {
      contract = vgetStakeBNBtoToken(userDetail?.contractAddress, web3);
      console.log("BNBToToken");
    } else if (
      userDetail?.isStakingTokenBnb == false &&
      userDetail?.isRewardTokenBnb == true
    ) {
      contract = vgetStakeTokentoBNB(userDetail?.contractAddress, web3);
      console.log("TokenTOBNB");
    } else if (
      userDetail?.isStakingTokenBnb == false &&
      userDetail?.isRewardTokenBnb == false
    ) {
      contract = vgetStakeTokentoToken(userDetail?.contractAddress, web3);
      console.log("TokenTOTOken");
    }
    // setMainLoader(true);
    const res = await contract.methods.isUnStakeActive().call();
    setIsLiveUnstake(res);
    console.log("Unstakeresssss", res);
    // let total = parseInt(res)
    // setMainLoader(false);
  };

  const handleChange2 = (e) => {
    const value = e.target.value;
    setInputs((inputs) => ({ ...inputs, lockPeriod: value }));
    setButtonEnable(false)
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
  console.log("argggginputssss", isLive);
  // console.log("argggginputssssbnb", token1)

  const handletoken11 = (evt) => {
    console.log("sjjsjssjlskjk");
    if (evt.target.files) {
      const filesarray = Array.from(evt.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      settoken1(filesarray);
      // Array.from(evt.target.files).map((file) => URL.createObjectURL(file))
    }
    var files = evt.target.files;
    var file = files[0];
    setMyFiles1(file);
  };

  const CreatePool = async () => {
    // toast.info("in the function");
    setMainLoader(true);
    let arg = "";
    let contract = "";
    let days = userDetail?.lockPeriod;
    if (
      userDetail?.isStakingTokenBnb == true &&
      userDetail?.isRewardTokenBnb == true
    ) {
      contract = vgetStakeBNBtoBNB(userDetail?.contractAddress, web3);
      console.log("bnbtobnb check address", userDetail?.contractAddress);
      console.log("BNBTOBNB");
    } else if (
      userDetail?.isStakingTokenBnb == true &&
      userDetail?.isRewardTokenBnb == false
    ) {
      contract = vgetStakeBNBtoToken(userDetail?.contractAddress, web3);
      console.log("BNBToToken");
    } else if (
      userDetail?.isStakingTokenBnb == false &&
      userDetail?.isRewardTokenBnb == true
    ) {
      contract = vgetStakeTokentoBNB(userDetail?.contractAddress, web3);
      console.log("TokenToBNB");
    } else if (
      userDetail?.isStakingTokenBnb == false &&
      userDetail?.isRewardTokenBnb == false
    ) {
      contract = vgetStakeTokentoToken(userDetail?.contractAddress, web3);
      console.log("TokenToToken check address", userDetail?.contractAddress);
      console.log("TokenToToken");
    }

    console.log(
      "arggggsss",
      inputs.ApyPerscentage,
      inputs?.lockPeriod,
      inputs.rewardWalletAddress,
      inputs.maxSupplyOfRewadPool,
      inputs.feeforPrematureUnstaking,
      inputs?.penaltyReward
      // inputs.autoCompound
    );

    console.log("argggg?????", contract);
    //console.log("contract-checking", contract);
    try {
      // toast.info("in the ");
      console.log("check inputtttttttt", inputs, days);
      const approved = await contract.methods
        .set(
          inputs?.maxSupplyOfRewadPool,
          true
        )
        .send({ from: account })
        .on("transactionHash", (tx) => {
          return tx?.transactionHash;
        });
      if (approved) {
        // toast.info("approved and function ");
        const data1 = new FormData();
        data1.append("poolName", inputs?.poolName);
        data1.append("contractAddress", inputs?.contractAddress);
        if (MyFiles) {
          data1.append("stakingTokenLogo", MyFiles);
        }
        if (MyFiles1) {
          data1.append("rewardTokenLogo", MyFiles1);
        }
        data1.append("maxSupplyOfRewadPool", inputs?.maxSupplyOfRewadPool);
        console.log("---------------++++++++++++++++++++++++++++++++++++");
        for (let [name, value] of data1) {
          console.log(`${name} = ${value}`); // key1 = value1, then key2 = value2
        }
        axios
          .post(`${API_URL}/v1/pool/updatePool`, data1, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((response) => {
            setMainLoader(false);
            history.push("/landing");
            toast.success("Pool Edit Successfully", {
              position: "top-right",
              autoClose: 3000,
            });
            // singleprojectdetail()
          })
          .catch((err) => {
            setMainLoader(false);
          });
      } else {
        setMainLoader(false);
        console.log("if err");
      }
    } catch (err) {
      setMainLoader(false);
      console.log("approve err", err);
      toast.error("User Denied Transaction", {
        position: "top-right",
        autoClose: 3000,
      });
      throw err;
    }
  };

  const handleTokenCHeckbox = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setInputs((inputs) => ({ ...inputs, tokenBNB: value }));
  };

  const handleRewardCHeckbox = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setInputs((inputs) => ({ ...inputs, rewardBNB: value }));
  };

  // const handleCompound = (e) => {
  //   const value =
  //     e.target.type === "checkbox" ? e.target.checked : e.target.value;
  //   console.log("value auto", value);
  //   setInputs((inputs) => ({ ...inputs, autoCompound: value }));
  // };
  const handleCompound = (e) => {
    // const value =
    //   e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const { checked } = e.target;

    setInputs((oldinputs) => ({ ...oldinputs, autoCompound: checked }));
  };

  const handleCompound1 = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setInputs((inputs) => ({ ...inputs, allowPrematureUnstaking: value }));
  };

  const handlepremature = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setInputs((inputs) => ({ ...inputs, PreUnstaking: value }));
  };

  const approveReward = async () => {
    setMainLoader(true);
    let contract = getTokenApprove(inputs?.rewardTokenAddress, web3);
    const weiAmount = web3.utils.toWei(apAmount + "");

    try {
      const res = await contract.methods
        .approve(inputs?.contractAddress, weiAmount)
        .send({ from: account });
      setMainLoader(false);
      window.$(`#basicModalunstake`).modal("hide");
      toast.success("Approve Successfull");
      console.log("weiAmount aa", weiAmount);
      console.log("weiAmount aaa", inputs?.contractAddress);
    } catch (err) {
      window.$(`#basicModalunstake`).modal("hide");
      setMainLoader(false);
      console.log("approve err", err);
      toast.error("Approve Failed");
      throw err;
    }
    setMainLoader(false);
  };

  useEffect(() => {
    getdata();
  }, [id]);

  useEffect(() => {
    // setMainLoader(true);
    getpauseStatusStaking();
    getpauseStatusUnStaking();
    // setMainLoader(false);
  }, [account, userDetail, isLive, isLiveUnstake]);

  useEffect(() => {
    setInputs((oldinputs) => ({
      ...oldinputs,
      autoCompound: inputs.autoCompound,
    }));
    console.log("====================================");
    console.log(inputs.autoCompound);
    console.log("====================================");
  }, [inputs.autoCompound]);
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
      <section className="create">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-11 col-12 m-auto">
              <div className="pool-detail box-shadow">
                <div className="heading">
                  <h5 className="create-heading">Pool Details</h5>
                  <img
                    src="/assests/line.svg"
                    alt="img"
                    className="img-fluid"
                  />
                </div>
                <div className="input-field">
                  <p>Pool Name</p>
                  <input
                    name="poolName"
                    value={inputs?.poolName}
                    type="text"
                    onChange={handleChange1}
                    placeholder="Enter pool name"
                    className="input-create"
                  />
                </div>
                <br />
                <div className="input-field">
                  <p>Pool Address</p>
                  <input
                    value={inputs?.contractAddress}
                    type="text"
                    readOnly
                    placeholder="Pool Address"
                    className="input-create"
                  />
                </div>
              </div>
              <div className="staking-token box-shadow">
                <div className="heading">
                  <h5 className="create-heading">Staking Token Details</h5>
                </div>
                <div className="switch">
                  <div class="custom-control custom-switch">
                    <input
                      // name="tokenBNB"
                      type="checkbox"
                      defaultChecked={inputs?.isStakingTokenBnb}
                      class="custom-control-input"
                      disabled
                      // onChange={handleTokenCHeckbox}
                      id="customSwitch"
                    />
                    <label class="custom-control-label" for="customSwitch">
                      Is BNB?
                    </label>
                  </div>
                  <div className="line">
                    <img
                      src="\assests\line.svg"
                        
                      alt="img"
                      className="img-fluid"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-4 col-lg-6 col-12 padd-0">
                    <div className="input-field">
                      <p>Staking Token Name</p>
                      <input
                        name="StakingTokenName"
                        value={inputs?.stakingTokenName}
                        type="text"
                        placeholder="Staking Token name"
                        // onChange={handleChange1}
                        readOnly
                        className="input-create"
                        // readOnly={inputs.tokenBNB}
                      />
                    </div>
                    <div className="input-field">
                      <p>Staking Token Address</p>
                      <input
                        name="StakingTokenAddress"
                        value={inputs?.stakingTokenAddress}
                        type="text"
                        placeholder="Staking Token Address"
                        // onChange={handleChange1}
                        className="input-create"
                        // readOnly={inputs.tokenBNB}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-12 padd-0">
                    <div className="input-field">
                      <p>Staking Token Symbol</p>
                      <input
                        name="StakingTokenSymbol"
                        value={inputs?.stakingTokenSymbol}
                        type="text"
                        placeholder="Staking Token symbol"
                        readOnly
                        className="input-create"
                        // readOnly={inputs.tokenBNB}
                      />
                    </div>
                    <div className="input-field">
                      <p>Decimals</p>
                      <input
                        name="StakingTokenDecimals"
                        value={inputs?.stakingDecimals}
                        type="text"
                        placeholder="Decimals"
                        readOnly
                        className="input-create"
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-12 col-12 padd-0">
                    <div className="input-field">
                      <p>Staking Token Logo</p>
                      <div className="upload" onChange={handletoken}>
                        {/* <label htmlFor="after-upload">
                            <img
                              src=".\assests\upload-img.png"
                              alt="img"
                              className="img-fluid upload-img"
                            />
                        </label> */}
                        <label htmlFor="tokenLogo">
                          <img
                            src={token}
                            alt="img"
                            className="img-fluid upload-img"
                          />
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
                          name="name"
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
                <div className="saking-btn">
                  {isLive === true ? (
                    <button className="btn-yellow" onClick={pauseStaking}>
                      <img
                        src="\assests\pause.svg"
                        alt="img"
                        className="img-fluid"
                      />
                      Pause Staking
                    </button>
                  ) : (
                    <button className="btn-yellow" onClick={pauseStaking}>
                      <img
                        src="\assests\pause.svg"
                        alt="img"
                        className="img-fluid"
                      />
                      Resume Staking
                    </button>
                  )}
                </div>
              </div>
              <div className="reward-token box-shadow">
                <div className="heading">
                  <h5 className="create-heading">Reward Token Details</h5>
                </div>
                <div className="switch">
                  <div class="custom-control custom-switch">
                    <input
                      name="rewardBNB"
                      type="checkbox"
                      class="custom-control-input"
                      defaultChecked={inputs?.isRewardTokenBnb}
                      disabled
                      // onChange={handleRewardCHeckbox}
                      id="customSwitch1"
                    />
                    <label class="custom-control-label" for="customSwitch1">
                      Is BNB?
                    </label>
                  </div>
                  <div className="line">
                    <img
                      src="\assests\line.svg"
                      alt="img"
                      className="img-fluid"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-4 col-lg-6 col-12 padd-0">
                    <div className="input-field">
                      <p>Reward Token Name</p>
                      <input
                        name="rewardTokenName"
                        value={inputs?.rewardTokenName}
                        readOnly
                        type="text"
                        placeholder="Reward Token name"
                        // onChange={handleChange1}
                        className="input-create"
                        // readOnly={inputs.rewardBNB}
                      />
                    </div>
                    <div className="input-field">
                      <p>Reward Token Address</p>
                      <input
                        name="rewardTokenAddress"
                        value={inputs?.rewardTokenAddress}
                        type="text"
                        placeholder="Reward Token Address"
                        readOnly
                        className="input-create"
                        // readOnly={inputs.rewardBNB}
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-12 padd-0">
                    <div className="input-field">
                      <p>Reward Token Symbol</p>
                      <input
                        name="rewardTokenSymbol"
                        value={inputs?.rewardTokenSymbol}
                        type="text"
                        placeholder="Reward Token symbol"
                        readOnly
                        className="input-create"
                      />
                    </div>
                    <div className="input-field">
                      <p>Decimals</p>
                      <input
                        name="rewardTokenDecimals"
                        value={inputs?.rewardDecimals}
                        type="text"
                        placeholder="Decimals"
                        readOnly
                        className="input-create"
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-12 col-12 padd-0">
                    <div className="input-field">
                      <p>Reward Token Logo</p>
                      <div className="upload" onChange={handletoken11}>
                        {/* <label htmlFor="after-upload">
                       
                        </label> */}
                        <label htmlFor="tokenLogo1">
                          <img
                            src={token1}
                            alt="img"
                            className="img-fluid upload-img"
                          />
                        </label>
                        <input
                          id="tokenLogo1"
                          name="name"
                          type="file"
                          placeholder="Enter pool name "
                          accept="image/*"
                          className="input-create d-none"
                        />
                        {/* <input
                          id="after-upload"
                          name="name"
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
                <div className="unsaking-btn">
                  {isLiveUnstake === true ? (
                    <button className="btn-yellow" onClick={pauseUnStaking}>
                      <img
                        src="\assests\pause.svg"
                        alt="img"
                        className="img-fluid"
                      />
                      Pause UnStaking
                    </button>
                  ) : (
                    <button className="btn-yellow" onClick={pauseUnStaking}>
                      <img
                        src="\assests\pause.svg"
                        alt="img"
                        className="img-fluid"
                      />
                      Resume UnStaking
                    </button>
                  )}
                </div>
              </div>
              <div className="other-detail box-shadow">
                <div className="heading">
                  <h5 className="create-heading">Other Details</h5>
                  <img
                    src="\assests\line.svg"
                    alt="img"
                    className="img-fluid"
                  />
                </div>
                <div className="row">
                  <div className="col-xl-7 col-12 padd-0">
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-12 padd-l">
                        <div class="input-field">
                          <p>Lock Period</p>
                          <select
                            class="form-select"
                            aria-label="Default select example"
                            onChange={handleChange2}
                            disabled
                            value={inputs?.lockPeriod / 60}
                          >
                            <option className="">
                              {inputs?.lockPeriod / 60}
                            </option>
                            <option value="300" className="inner-option">
                              5 Minuets
                            </option>
                            <option value="600" className="inner-option">
                              10 Minuets
                            </option>
                            <option value="900" className="inner-option">
                              15 Minuets
                            </option>
                            <option value="1200" className="inner-option">
                              20 Minuets
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="input-field">
                      <p>Reward Wallet Address</p>
                      <input
                        name="rewardWalletAddress"
                        disabled
                        type="text"
                        value={inputs.rewardWalletAddress}
                        placeholder="Reward Token symbol"
                        onChange={handleChange1}
                        className="input-create"
                      />
                    </div>
                    <div className="input-field">
                      <p>Max Supply of Reward Pool</p>
                      <input
                        name="maxSupplyOfRewadPool"
                        type="text"
                        placeholder="Reward Max Supply"
                        value={inputs.maxSupplyOfRewadPool}
                        onChange={handleChange1}
                        className="input-create"
                      />
                    </div>
                    <div className="input-field">
                      <p>Reward Per Block</p>
                      <input
                        name="rewardPerBlock"
                        type="text"
                        disabled
                        placeholder="Reward Max Supply"
                        value={inputs.rewardPerBlock}
                        onChange={handleChange1}
                        className="input-create"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="btn-create">
              <button disabled={buttonEnable} className={buttonEnable ? ' batiq' :"btn-yellow"  } onClick={CreatePool}>
                  Edit
                </button>
                {!inputs?.isRewardTokenBnb && (
                  <button
                    className="btn-clear"
                    onClick={() => window.$(`#basicModalunstake`).modal("show")}
                  >
                    Approve {inputs?.rewardTokenSymbol} Token
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />

      <div className="modal1">
        <div
          class="modal fade"
          id={`basicModalunstake`}
          tabindex="-1"
          role="dialog"
          aria-labelledby="basicModal"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content p-md-4">
              <div class="modal-header">
                <h4 class="modal-title modalHH" id="myModalLabel">
                  Approve{" "}
                  <span className="text-capitalize">
                    {inputs?.rewardTokenSymbol}
                  </span>{" "}
                  Token
                </h4>
                <button
                  type="button"
                  class="close"
                  onClick={() => window.$(`#basicModalunstake`).modal("hide")}
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <img src="\assests\CardsImg\modalclose.svg" alt="" />
                </button>
              </div>
              <div class="modal-body">
                <input
                  onChange={(e) => setApAmount(e.target.value)}
                  type="text"
                  placeholder="Enter Approve Token Amount"
                  className="modalApproveInput w-100"
                />

                <button
                  onClick={() => approveReward()}
                  className="btn-yellow mt-4 w-100 mocalBtn"
                >
                  Approve Token
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditVariable;