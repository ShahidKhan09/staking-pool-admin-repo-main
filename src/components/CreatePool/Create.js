import React, { useEffect, useState } from "react";
import Footer from "../landing/footer/Footer";
import Navbar from "../landing/header/Navbar";
import Loader from "../../hooks/loader";
import axios from "axios";
import { toast } from "react-toastify";
import "./create.scss";
import { useHistory } from "react-router-dom";
import { getFactoryContract } from "../../utils/contractHelpers";
import Environment from "../../utils/Environment";
import { useWeb3React } from "@web3-react/core";
import { API_URL } from "../../utils/ApiUrl";
import { useCallback } from "react";
import useWeb3 from "../../hooks/useWeb3";
import { InputSharp } from "@material-ui/icons";

import ClaimLGX from "./Claim.json";

const Create = () => {
  const history = useHistory();
  const [mainLoader, setMainLoader] = useState(false);
  const web3 = useWeb3();
  const { account } = useWeb3React();
  const [token1, settoken1] = useState();
  const [token, settoken] = useState();
  const [MyFiles, setMyFiles] = useState();
  const [MyFiles1, setMyFiles1] = useState();
  const [isBNB, setisBNB] = useState({
    StakingTokenName: "Binance Coin",
    StakingTokenSymbol: "BNB",
    StakingTokenAddress: "-",
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
    apy: "",
    rewardWalletAddress: "",
    maxSupplyReward: "",
    autoCompound: false,
    PreUnstaking: false,
    feeUnstaking: "0",
    penaltyReward: "0",
  });
  const {
    tokenBNB,
    StakingTokenName,
    StakingTokenSymbol,
    StakingTokenAddress,
    StakingTokenDecimals,
    rewardTokenName,
    rewardTokenSymbol,
    rewardTokenAddress,
    rewardTokenDecimals,
  } = inputs;

  console.log("inputs fields", token);

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const handleChange5 = () => {
    settoken('');
    setInputs({
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
      apy: "",
      rewardWalletAddress: "",
      maxSupplyReward: "",
      autoCompound: false,
      PreUnstaking: false,
      feeUnstaking: "0",
      penaltyReward: "0",
    });
    settoken('');
    settoken1('');
    setMyFiles('');
    setMyFiles1('');
  };
  const handleChange2 = (e) => {
    const value = e.target.value;
    setInputs((inputs) => ({ ...inputs, lockPeriod: value }));
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
  console.log("argggginputssss", inputs);
  // console.log("argggginputssssbnb", isBNB)
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

  // const tx = async () => {
  //   const res = await axios
  //     .get("http://192.168.18.79:3001/api2/claim/signedKey")
  //     .then(async (response) => {
  //       // console.log("response=====?", response);
  //       // console.log("response=====?", response.data.data.deadline);
  //       // console.log("response=====?", response.data.data.signedKey);

  //       const claimContractLGX = new web3.eth.Contract(
  //         ClaimLGX,
  //         "0x0a51470D46DFe4773fC89DdD14D2862FB6bd4D5f"
  //       );
  //       console.log("response=====?", claimContractLGX);

  //       const claimres = await claimContractLGX.methods
  //         .claim(
  //           account,
  //           "60000000000000000000",
  //           response.data.data?.signedKey.v,
  //           response.data.data.signedKey.r,
  //           response.data.data.signedKey.s,
  //           response.data.data.deadline
  //         )
  //         .send({ from: account })
  //         .on("transactionHash", (tx) => {
  //           return tx.transactionHash;
  //         });

  //       console.log("response=====?", claimres);
  //     });

  //   const waiAmount = web3.utils.toWei("6");
  // };

  const CreatePool = async () => {
    setMainLoader(true);
    let arg = "";
    let deployNewCollection = "";
    // BNB FOR BNB
    if (inputs.tokenBNB && inputs.rewardBNB) {
      deployNewCollection = "createBnbForBnb";
      arg = {
        ownerAddress: account,
        _earlyUnstakeFee: inputs.PreUnstaking
          ? inputs.feeUnstaking.toString()
          : 0,
        _lockPeriod: inputs.lockPeriod, //below are new added contract inputs
        _apy: inputs.apy,
        _rewardingTokenWallet: account,
        _maxReward: inputs.maxSupplyReward,
        _earlyRewardUstakeFee: inputs.penaltyReward,
        _autoCompund: inputs.autoCompound,
        _earlyUstake: inputs.PreUnstaking ? true : false,
      };
    }
    // BNB FOR TOKEN
    else if (inputs.tokenBNB && inputs.rewardBNB == false) {
      deployNewCollection = "createBnbForToken";
      arg = {
        ownerAddress: account,
        _earlyUnstakeFee: inputs.PreUnstaking
          ? inputs.feeUnstaking.toString()
          : 0,
        _rewardingToken: inputs.rewardTokenAddress,
        _rewardingTokenWallet: account,
        _lockPeriod: inputs.lockPeriod, //below are new added contract inputs
        _apy: inputs.apy,
        _maxReward: inputs.maxSupplyReward,
        _earlyRewardUstakeFee: inputs.penaltyReward,
        _autoCompund: inputs.autoCompound,
        _earlyUstake: inputs.PreUnstaking ? true : false,
      };
    }
    // TOKEN FOR BNB
    else if (inputs.tokenBNB == false && inputs.rewardBNB) {
      // toast.info("in Token for Bnb");

      deployNewCollection = "createTokenForBnb";
      arg = {
        ownerAddress: account,
        _apy: inputs.apy,
        _earlyUnstakeFee: inputs.PreUnstaking
          ? inputs.feeUnstaking.toString()
          : 0,
        _stakeToken: inputs.tokenBNB
          ? isBNB.StakingTokenAddress
          : inputs.StakingTokenAddress,
        _rewardingTokenWallet: account,
        _lockPeriod: inputs.lockPeriod, //below are new added contract inputs
        _maxReward: inputs.maxSupplyReward,
        _earlyRewardUstakeFee: inputs.penaltyReward,
        _autoCompund: inputs.autoCompound,
        _earlyUstake: inputs.PreUnstaking ? true : false,
      };
      console.log("jawad token for bnb", arg);
    }
    // TOKEN FOR TOKEN
    else if (inputs.tokenBNB == false && inputs.rewardBNB == false) {
      deployNewCollection = "createTokenForToken";
      arg = {
        ownerAddress: account,
        _earlyUnstakeFee: inputs.PreUnstaking
          ? inputs.feeUnstaking.toString()
          : 0,
        _stakingToken: inputs.tokenBNB
          ? isBNB.StakingTokenAddress
          : inputs.StakingTokenAddress,
        _rewardingToken: inputs.rewardTokenAddress,
        _rewardingTokenWallet: account,
        _lockPeriod: inputs.lockPeriod, //below are new added contract inputs
        _apy: inputs.apy,
        _maxReward: inputs.maxSupplyReward,
        _earlyRewardUstakeFee: inputs.penaltyReward,
        _autoCompund: inputs.autoCompound,
        _earlyUstake: inputs.PreUnstaking ? true : false,
      };
    }
    // console.log("argggg", arg);
    console.log(
      "xxxxxxxxxxxxx",
      deployNewCollection,
      arg,
      Environment.factoryContarct
    );
    try {
      const contract = getFactoryContract(Environment.factoryContarct, web3);
      console.log("ssssssssssssss", account);
      const approved = await contract.methods[deployNewCollection](arg)
        .send({ from: account })
        .on("transactionHash", (tx) => {
          return tx.transactionHash;
        });
      const data1 = new FormData();
      data1.append("contractAddress", approved.events[0].address);
      data1.append("poolName", inputs.poolName);
      data1.append(
        "stakingTokenName",
        inputs.tokenBNB == true ? isBNB.StakingTokenName : StakingTokenName
      );
      data1.append(
        "stakingTokenSymbol",
        inputs.tokenBNB == true ? isBNB.StakingTokenSymbol : StakingTokenSymbol
      );
      data1.append("stakingTokenLogo", MyFiles);
      data1.append(
        "stakingTokenAddress",
        inputs.tokenBNB == true
          ? isBNB.StakingTokenAddress
          : StakingTokenAddress
      );
      data1.append(
        "stakingDecimals",
        inputs.tokenBNB == true
          ? isBNB.StakingTokenDecimals
          : StakingTokenDecimals
      );
      data1.append(
        "rewardTokenName",
        inputs.rewardBNB == true ? isBNB.StakingTokenName : rewardTokenName
      );
      data1.append(
        "rewardTokenSymbol",
        inputs.rewardBNB == true ? isBNB.StakingTokenSymbol : rewardTokenSymbol
      );
      data1.append("rewardTokenLogo", MyFiles1);
      data1.append(
        "rewardTokenAddress",
        inputs.rewardBNB == true
          ? isBNB.StakingTokenAddress
          : rewardTokenAddress
      );
      data1.append(
        "rewardDecimals",
        inputs.rewardBNB == true
          ? isBNB.StakingTokenDecimals
          : rewardTokenDecimals
      );
      data1.append("lockPeriod", inputs.lockPeriod);
      data1.append("rewardWalletAddress", account);
      data1.append("maxSupplyOfRewadPool", inputs.maxSupplyReward);
      data1.append("ApyPerscentage", inputs.apy);
      data1.append("isStakingTokenBnb", inputs.tokenBNB);
      data1.append("isRewardTokenBnb", inputs.rewardBNB);
      data1.append("allowPrematureUnstaking", inputs.PreUnstaking);
      data1.append("autoCompound", inputs.autoCompound);
      data1.append("feeForPrematureUnstaking", inputs.feeUnstaking);
      data1.append("variable", false);
      data1.append("penaltyReward", inputs.penaltyReward);
      console.log("apppr", data1);
      axios
        .post(`${API_URL}/v1/pool/createpool`, data1, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          setMainLoader(false);
          history.push("/landing");
          toast.success("Pool Created Successfully", {
            position: "top-right",
            autoClose: 3000,
          });
          // singleprojectdetail()
        })
        .catch((err) => {
          setMainLoader(false);
        });

    } catch (err) {
      setMainLoader(false);
      toast.error("Pool Creation Error", {
        position: "top-right",
        autoClose: 3000,
      });
      console.log("approve err", err);
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

  const handleCompound = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setInputs((inputs) => ({ ...inputs, autoCompound: value }));
  };

  const handlepremature = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setInputs((inputs) => ({ ...inputs, PreUnstaking: value }));
  };
  useEffect(() => {
    let token = localStorage.getItem('mytoken')
    if (token) {
      history.push('/create')
    } else {
      history.push('/')
    }
  }, [])
 
  
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
                    src=".\assests\line.svg"
                    alt="img"
                    className="img-fluid"
                  />
                </div>
                <div className="input-field">
                  <p>Pool Name</p>
                  <input
                    name="poolName"
                    type="text"
                    value={inputs.poolName}
                    onChange={handleChange1}
                    placeholder="Enter pool name"
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
                      name="tokenBNB"
                      type="checkbox"
                      checked={inputs.tokenBNB}
                      class="custom-control-input"
                      onChange={handleTokenCHeckbox}
                      id="customSwitch"
                    />
                    <label class="custom-control-label" for="customSwitch">
                      Is BNB?
                    </label>
                  </div>
                  <div className="line">
                    <img
                      src=".\assests\line.svg"
                      alt="img"
                      className="img-fluid"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-4 col-lg-6 col-12">
                    <div className="input-field">
                      <p>Staking Token Name</p>
                      <input
                        name="StakingTokenName"
                        value={
                          inputs.tokenBNB
                            ? isBNB.StakingTokenName
                            : StakingTokenName
                        }
                        type="text"
                        placeholder="Staking Token name"
                        onChange={handleChange1}
                        className="input-create"
                        readOnly={inputs.tokenBNB}
                      />
                    </div>
                    <div className="input-field">
                      <p>Staking Token Address</p>
                      <input
                        name="StakingTokenAddress"
                        value={
                          inputs.tokenBNB
                            ? isBNB.StakingTokenAddress
                            : StakingTokenAddress
                        }
                        type="text"
                        placeholder="Staking Token Address"
                        onChange={handleChange1}
                        className="input-create"
                        readOnly={inputs.tokenBNB}
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-12">
                    <div className="input-field">
                      <p>Staking Token Symbol</p>
                      <input
                        name="StakingTokenSymbol"
                        value={
                          inputs.tokenBNB
                            ? isBNB.StakingTokenSymbol
                            : StakingTokenSymbol
                        }
                        type="text"
                        placeholder="Staking Token symbol"
                        onChange={handleChange1}
                        className="input-create"
                        readOnly={inputs.tokenBNB}
                      />
                    </div>
                    <div className="input-field">
                      <p>Decimals</p>
                      <input
                        name="StakingTokenDecimals"
                        value={
                          inputs.tokenBNB
                            ? isBNB.StakingTokenDecimals
                            : StakingTokenDecimals
                        }
                        type="text"
                        placeholder="Decimals"
                        onChange={handleChange1}
                        className="input-create"
                        readOnly={inputs.tokenBNB}
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-12 col-12">
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
                      checked={inputs.rewardBNB}
                      class="custom-control-input"
                      onChange={handleRewardCHeckbox}
                      id="customSwitch1"
                    />
                    <label class="custom-control-label" for="customSwitch1">
                      Is BNB?
                    </label>
                  </div>
                  <div className="line">
                    <img
                      src=".\assests\line.svg"
                      alt="img"
                      className="img-fluid"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-4 col-lg-6 col-12">
                    <div className="input-field">
                      <p>Reward Token Name</p>
                      <input
                        name="rewardTokenName"
                        value={
                          inputs.rewardBNB
                            ? isBNB.StakingTokenName
                            : rewardTokenName
                        }
                        type="text"
                        placeholder="Reward Token name"
                        onChange={handleChange1}
                        className="input-create"
                        readOnly={inputs.rewardBNB}
                      />
                    </div>
                    <div className="input-field">
                      <p>Reward Token Address</p>
                      <input
                        name="rewardTokenAddress"
                        value={
                          inputs.rewardBNB
                            ? isBNB.StakingTokenAddress
                            : rewardTokenAddress
                        }
                        type="text"
                        placeholder="Reward Token Address"
                        onChange={handleChange1}
                        className="input-create"
                        readOnly={inputs.rewardBNB}
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-12">
                    <div className="input-field">
                      <p>Reward Token Symbol</p>
                      <input
                        name="rewardTokenSymbol"
                        value={
                          inputs.rewardBNB
                            ? isBNB.StakingTokenSymbol
                            : rewardTokenSymbol
                        }
                        type="text"
                        placeholder="Reward Token symbol"
                        onChange={handleChange1}
                        className="input-create"
                        readOnly={inputs.rewardBNB}
                      />
                    </div>
                    <div className="input-field">
                      <p>Decimals</p>
                      <input
                        name="rewardTokenDecimals"
                        value={
                          inputs.rewardBNB
                            ? isBNB.StakingTokenDecimals
                            : rewardTokenDecimals
                        }
                        type="text"
                        placeholder="Decimals"
                        onChange={handleChange1}
                        className="input-create"
                        readOnly={inputs.rewardBNB}
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-12 col-12">
                    <div className="input-field">
                      <p>Reward Token Logo</p>
                      <div className="upload" onChange={handletoken11}>
                        {/* <label htmlFor="after-upload">
                       
                        </label> */}
                        <label htmlFor="tokenLogo1">
                          {token1 ? (
                            <img
                              src={token1}
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
              </div>
              <div className="other-detail box-shadow">
                <div className="heading">
                  <h5 className="create-heading">Other Details</h5>
                  <img
                    src=".\assests\line.svg"
                    alt="img"
                    className="img-fluid"
                  />
                </div>
                <div className="row">
                  <div className="col-xl-7 col-12 padd-0">
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-12 padd-l">
                        <div class="input-field">
                          <p>Lock Period</p>
                          <select
                            class="form-select"
                            aria-label="Default select example"
                            value={inputs.lockPeriod}
                            onChange={handleChange2}
                          >
                            <option selected className="">
                              Select Minuets
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
                      <div className="col-xl-6 col-lg-6 col-12 padd-0">
                        <div className="input-field apy">
                          <p>APY %</p>
                          <input
                            name="apy"
                            type="number"
                            placeholder="Reward Token symbol"
                            onChange={handleChange1}
                            value={inputs.apy}
                            className="input-create"
                          />
                          <img
                            src="\assests\icon.svg"
                            alt="img"
                            className="img-fluid percent"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="input-field">
                      <p>Reward Wallet Address</p>
                      <input
                        name="rewardWalletAddress"
                        type="text"
                        placeholder="Connect Your Wallet"
                        readOnly
                        value={account}
                        onChange={handleChange1}
                        className="input-create"
                      />
                    </div>
                    <div className="input-field">
                      <p>Max Supply of Reward Pool</p>
                      <input
                        name="maxSupplyReward"
                        type="text"
                        placeholder="Max supply of reward pool"
                        onChange={handleChange1}
                        value={inputs.maxSupplyReward}
                        className="input-create"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="two-switch box-shadow">
                <div className="switch">
                  <div class="custom-control custom-switch">
                    <input
                      name="autoCompound"
                      type="checkbox"
                      checked={inputs.autoCompound}
                      class="custom-control-input"
                      id="customSwitch2"
                      onChange={(e) => handleCompound(e)}
                    />
                    <label class="custom-control-label" for="customSwitch2">
                      Auto Compound
                    </label>
                  </div>
                </div>
                <div className="switch">
                  <div class="custom-control custom-switch">
                    <input
                      name="PreUnstaking"
                      type="checkbox"
                      class="custom-control-input"
                      id="customSwitch5"
                      checked={inputs.PreUnstaking}
                      onChange={handlepremature}
                    />
                    <label class="custom-control-label" for="customSwitch5">
                      Allow Premature Unstaking
                    </label>
                  </div>
                  <div className="input-field">
                    {inputs.PreUnstaking == true ? (
                      <>
                        <p className="switch-para">
                          Fee for Premature Unstaking
                        </p>
                        <input
                          type="number"
                          placeholder="Fee"
                          name="feeUnstaking"
                          onChange={handleChange1}
                          className="input-create"
                          value={inputs.feeUnstaking}
                        />
                        <br />
                        <p className="switch-para">
                          Penalty for Staking Rewards
                        </p>
                        <input
                          type="number"
                          placeholder="penalty"
                          name="penaltyReward"
                          onChange={handleChange1}
                          value={inputs.penaltyReward}
                          className="input-create"
                        />
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>

              <div className="btn-create">
                {account ? (
                  <button className="btn-yellow" onClick={CreatePool}>
                    Create Project
                  </button>
                ) : (
                  /* <button className="btn-red" onClick={tx}>
                    Create Project
                  </button> */
                  "connect your wallet"
                )}

                <button onClick={handleChange5} className="btn-clear">Clear All</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Create;
