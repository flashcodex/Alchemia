
<?php
@session_start();
require_once "classes/Config.php";
$config = new Config();

include($_SERVER['DOCUMENT_ROOT'].'/alchemia/resources/views/layouts/header.blade.php')
?>
<!DOCTYPE html>
<html lang="en">
	<!--begin::Head-->
	<head><base href="">
		<meta charset="utf-8" />
		<title>Alchemia | Sign Up</title>
		<meta name="description" content="Singin page example" />
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
		<link rel="canonical" href="https://keenthemes.com/metronic" />
		<!--begin::Fonts-->
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" />
		<!--end::Fonts-->
		<!--begin::Page Custom Styles(used by this page)-->
		<link href="assets/css/pages/login/login-3.css" rel="stylesheet" type="text/css" />
		<!--end::Page Custom Styles-->
		<!--begin::Global Theme Styles(used by all pages)-->
		<link href="assets/plugins/global/plugins.bundle.css" rel="stylesheet" type="text/css" />
		<link href="assets/plugins/custom/prismjs/prismjs.bundle.css" rel="stylesheet" type="text/css" />
		<link href="assets/css/style.bundle.css" rel="stylesheet" type="text/css" />
		<link href="assets/plugins/custom/bootstrap-pincode-input-master/css/bootstrap-pincode-input.css" rel="stylesheet">
		<!--end::Global Theme Styles-->
		<!--begin::Layout Themes(used by all pages)-->
		<!--end::Layout Themes-->
		<link rel="shortcut icon" href="<?php echo $config->icon()?>" />
	</head>
	<!--end::Head-->
	<!--begin::Body-->
	<body id="kt_body" class="header-fixed header-mobile-fixed subheader-enabled subheader-fixed aside-enabled aside-fixed page-loading">
		<!--begin::Main-->
		<div class="d-flex flex-column flex-root">
			<!--begin::Login-->
			<div class="login login-3 wizard d-flex flex-column flex-lg-row flex-column-fluid wizard" id="kt_login">
				<!--begin::Aside-->
				<div class="login-aside d-flex flex-column flex-row-auto">
					<!--begin::Aside Top-->
					<div class="d-flex flex-column-auto flex-column ">
						<!--begin::Aside header-->
						<a href="../login/" class="login-logo py-6 text-center">
							<h1><img src="<?php echo $config->login_logo()?>" class="max-h-70px" alt="" />ALCHEMIA</h1>
						</a>
						<!--end::Aside header-->
						<!--begin: Wizard Nav-->
						<div class="wizard-nav pt-5 pt-lg-30 d-flex justify-content-center">
							<!--begin::Wizard Steps-->
							<div class="wizard-steps">
								<!--begin::Wizard Step 2 Nav-->
								<div class="wizard-step" data-wizard-type="step" data-wizard-state="current">
									<div class="wizard-wrapper">
										<div class="wizard-icon">
											<i class="wizard-check ki ki-check"></i>
											<span class="wizard-number">1</span>
										</div>
										<div class="wizard-label">
											<h3 class="wizard-title">Personal Information</h3>
											<div class="wizard-desc">Setup Your Personal Details</div>
										</div>
									</div>
								</div>
								<!--end::Wizard Step 2 Nav-->
								<!--begin::Wizard Step 3 Nav-->
								<div class="wizard-step" data-wizard-type="step">
									<div class="wizard-wrapper">
										<div class="wizard-icon">
											<i class="wizard-check ki ki-check"></i>
											<span class="wizard-number">2</span>
										</div>
										<div class="wizard-label">
											<h3 class="wizard-title">Account Settings</h3>
											<div class="wizard-desc">Setup Your Account Details</div>
										</div>
									</div>
								</div>
								<!--end::Wizard Step 3 Nav-->
								<!--begin::Wizard Step 4 Nav-->
								<div class="wizard-step" data-wizard-type="step">
									<div class="wizard-wrapper">
										<div class="wizard-icon">
											<i class="wizard-check ki ki-check"></i>
											<span class="wizard-number">3</span>
										</div>
										<div class="wizard-label">
											<h3 class="wizard-title">Completed!</h3>
											<div class="wizard-desc">Review and Submit</div>
										</div>
									</div>
								</div>
								<!--end::Wizard Step 4 Nav-->
							</div>
							<!--end::Wizard Steps-->
						</div>
						<!--end: Wizard Nav-->
					</div>
					<!--end::Aside Top-->
					<!--begin::Aside Bottom-->
					<!-- <div class="aside-img-wizard d-flex flex-row-fluid bgi-no-repeat bgi-position-y-bottom bgi-position-x-center pt-2 pt-lg-5" style="background-position-y: calc(100% + 3rem); background-image: url(assets/media/svg/illustrations/features.svg)"></div> -->
					<!--end::Aside Bottom-->
				</div>
				<!--begin::Aside-->
				<!--begin::Content-->
				<div class="login-content flex-column-fluid d-flex flex-column p-10">
					<!--begin::Top-->
					<!-- <div class="text-right d-flex justify-content-center">
						<div class="top-signup text-right d-flex justify-content-end pt-5 pb-lg-0 pb-10">
							<span class="font-weight-bold text-muted font-size-h4">Having issues?</span>
							<a href="javascript:;" class="font-weight-bolder text-primary font-size-h4 ml-2" id="kt_login_signup">Get Help</a>
						</div>
					</div> -->
					<!--end::Top-->
					<!--begin::Wrapper-->
					<div class="d-flex flex-row-fluid flex-center">
						<!--begin::Signin-->
						<div class="login-form login-form-signup">
							<!--begin::Form-->
							<form class="form" novalidate="novalidate" id="kt_login_signup_form" onkeydown="return event.key != 'Enter';">
								<!--begin: Wizard Step 1-->
								
								<!--end: Wizard Step 1-->
								<!--begin: Wizard Step 2-->
								<div class="pb-5" data-wizard-type="step-content" data-wizard-state="current">
									<!--begin::Title-->
									<div class="pt-lg-0 pt-5 pb-15">
										<h3 class="font-weight-bolder text-dark font-size-h2 font-size-h1-lg">Personal Information</h3>
										<div class="text-muted font-weight-bold font-size-h4">Setup Your Personal Details</div>
									</div>
									<!--begin::Title-->
									
											<div class="form-group">
												<label class="font-size-h6 font-weight-bolder text-dark">First Name</label>
												<input type="text" class="form-control h-auto py-5 px-6 border-0 rounded-lg font-size-h6" name="fname" placeholder="Enter your first name" value="" />
											</div>
											<!--end::Input-->
											<!--begin::Input-->
											<div class="form-group">
												<label class="font-size-h6 font-weight-bolder text-dark">Last Name</label>
												<input type="text" class="form-control h-auto py-5 px-6 border-0 rounded-lg font-size-h6" name="lname" placeholder="Enter your last name" value="" />
											</div>
											<!--end::Input-->
									<!--end::Row-->
									<!--begin::Row-->
									<div class="row">
										<div class="col-xl-6">
											<!--begin::Input-->
											<div class="form-group">
												<label class="font-size-h6 font-weight-bolder text-dark">Mobile</label>
												<div class="row">
													<!--<div class="col-4">
														<select name="phonecode" class="form-control h-auto py-5 px-3 border-0 rounded-lg font-size-h6">
<option value="1">+1</option><option value="7">+7</option><option value="20">+20</option><option value="27">+27</option><option value="30">+30</option><option value="31">+31</option><option value="32">+32</option><option value="33">+33</option><option value="34">+34</option><option value="36">+36</option><option value="39">+39</option><option value="40">+40</option><option value="41">+41</option><option value="43">+43</option><option value="44">+44</option><option value="45">+45</option><option value="46">+46</option><option value="47">+47</option><option value="48">+48</option><option value="49">+49</option><option value="51">+51</option><option value="52">+52</option><option value="53">+53</option><option value="54">+54</option><option value="55">+55</option><option value="56">+56</option><option value="57">+57</option><option value="58">+58</option><option value="60">+60</option><option value="61">+61</option><option value="62">+62</option><option value="63" selected>+63</option><option value="64">+64</option><option value="65">+65</option><option value="66">+66</option><option value="70">+70</option><option value="81">+81</option><option value="82">+82</option><option value="84">+84</option><option value="86">+86</option><option value="90">+90</option><option value="91">+91</option><option value="92">+92</option><option value="93">+93</option><option value="94">+94</option><option value="95">+95</option><option value="98">+98</option><option value="212">+212</option><option value="213">+213</option><option value="216">+216</option><option value="218">+218</option><option value="220">+220</option><option value="221">+221</option><option value="222">+222</option><option value="223">+223</option><option value="224">+224</option><option value="225">+225</option><option value="226">+226</option><option value="227">+227</option><option value="228">+228</option><option value="229">+229</option><option value="230">+230</option><option value="231">+231</option><option value="232">+232</option><option value="233">+233</option><option value="234">+234</option><option value="235">+235</option><option value="236">+236</option><option value="237">+237</option><option value="238">+238</option><option value="239">+239</option><option value="240">+240</option><option value="241">+241</option><option value="242">+242</option><option value="244">+244</option><option value="245">+245</option><option value="246">+246</option><option value="248">+248</option><option value="249">+249</option><option value="250">+250</option><option value="251">+251</option><option value="252">+252</option><option value="253">+253</option><option value="254">+254</option><option value="255">+255</option><option value="256">+256</option><option value="257">+257</option><option value="258">+258</option><option value="260">+260</option><option value="261">+261</option><option value="262">+262</option><option value="263">+263</option><option value="264">+264</option><option value="265">+265</option><option value="266">+266</option><option value="267">+267</option><option value="268">+268</option><option value="269">+269</option><option value="290">+290</option><option value="291">+291</option><option value="297">+297</option><option value="298">+298</option><option value="299">+299</option><option value="350">+350</option><option value="351">+351</option><option value="352">+352</option><option value="353">+353</option><option value="354">+354</option><option value="355">+355</option><option value="356">+356</option><option value="357">+357</option><option value="358">+358</option><option value="359">+359</option><option value="370">+370</option><option value="371">+371</option><option value="372">+372</option><option value="373">+373</option><option value="374">+374</option><option value="375">+375</option><option value="376">+376</option><option value="377">+377</option><option value="378">+378</option><option value="380">+380</option><option value="381">+381</option><option value="385">+385</option><option value="386">+386</option><option value="387">+387</option><option value="389">+389</option><option value="420">+420</option><option value="421">+421</option><option value="423">+423</option><option value="500">+500</option><option value="501">+501</option><option value="502">+502</option><option value="503">+503</option><option value="504">+504</option><option value="505">+505</option><option value="506">+506</option><option value="507">+507</option><option value="508">+508</option><option value="509">+509</option><option value="590">+590</option><option value="591">+591</option><option value="592">+592</option><option value="593">+593</option><option value="594">+594</option><option value="595">+595</option><option value="596">+596</option><option value="597">+597</option><option value="598">+598</option><option value="599">+599</option><option value="670">+670</option><option value="672">+672</option><option value="673">+673</option><option value="674">+674</option><option value="675">+675</option><option value="676">+676</option><option value="677">+677</option><option value="678">+678</option><option value="679">+679</option><option value="680">+680</option><option value="681">+681</option><option value="682">+682</option><option value="683">+683</option><option value="684">+684</option><option value="686">+686</option><option value="687">+687</option><option value="688">+688</option><option value="689">+689</option><option value="690">+690</option><option value="691">+691</option><option value="692">+692</option><option value="850">+850</option><option value="852">+852</option><option value="853">+853</option><option value="855">+855</option><option value="856">+856</option><option value="880">+880</option><option value="886">+886</option><option value="960">+960</option><option value="961">+961</option><option value="962">+962</option><option value="963">+963</option><option value="964">+964</option><option value="965">+965</option><option value="966">+966</option><option value="967">+967</option><option value="968">+968</option><option value="970">+970</option><option value="971">+971</option><option value="972">+972</option><option value="973">+973</option><option value="974">+974</option><option value="975">+975</option><option value="976">+976</option><option value="977">+977</option><option value="992">+992</option><option value="994">+994</option><option value="995">+995</option><option value="996">+996</option><option value="998">+998</option><option value="1242">+1242</option><option value="1246">+1246</option><option value="1264">+1264</option><option value="1268">+1268</option><option value="1284">+1284</option><option value="1340">+1340</option><option value="1345">+1345</option><option value="1441">+1441</option><option value="1473">+1473</option><option value="1649">+1649</option><option value="1664">+1664</option><option value="1670">+1670</option><option value="1671">+1671</option><option value="1684">+1684</option><option value="1758">+1758</option><option value="1767">+1767</option><option value="1784">+1784</option><option value="1787">+1787</option><option value="1809">+1809</option><option value="1868">+1868</option><option value="1869">+1869</option><option value="1876">+1876</option><option value="7370">+7370</option>
														</select> 
													</div> -->
													<div class="col-12"> 
														<input type="text" class="form-control h-auto py-5 px-6 border-0 rounded-lg font-size-h6" placeholder="Enter your mobile number" id="mobile" name="mobile" />
													</div>
												</div>
											</div>
											<!--end::Input-->
										</div>
										<div class="col-xl-6">
											<!--begin::Input-->
											<div class="form-group">
												<label class="font-size-h6 font-weight-bolder text-dark">Email </label><span class="label label-lg label-light-primary label-inline ml-2">This will be verified</span>
												<input id="email" type="email" class="form-control h-auto py-5 px-6 border-0 rounded-lg font-size-h6" name="email" placeholder="Enter your active mail" value="" />
												<div class="fv-plugins-message-container"><div data-field="email" data-validator="emailAddress" class="fv-help-block" id="email-error"></div></div>
											</div>
											<!--end::Input-->
										</div>
									</div>
									<!--end::Row-->
								</div>
								<!--end: Wizard Step 2-->
								<!--begin: Wizard Step 3-->
								<div class="pb-5" data-wizard-type="step-content">
									<div class="pt-lg-0 pt-5 pb-15">
										<h3 class="font-weight-bolder text-dark font-size-h2 font-size-h1-lg">Account Settings</h3>
										<div class="text-muted font-weight-bold font-size-h4">Setup Your Account Details</div>
									</div>
									<div class="form-group" style="display: none;">
										<label class="font-size-h6 font-weight-bolder text-dark">User ID </label><span class="label label-lg label-light-primary label-inline ml-2">Auto-Generated</span>
										<input type="number" class="form-control h-auto py-5 px-6 border-0 rounded-lg font-size-h6" name="username" value="" readonly />
									</div>
									<div class="row">
										<div class="col-xl-6">
											<div class="form-group">
												<label class="font-size-h6 font-weight-bolder text-dark">Create Password</label>
												<input type="password" class="form-control h-auto py-5 px-6 border-0 rounded-lg font-size-h6" name="password" placeholder="Enter your password" value="" />
											</div>
										</div>
										<div class="col-xl-6">
											<div class="form-group">
												<label class="font-size-h6 font-weight-bolder text-dark">Confirm Password</label>
												<input type="password" class="form-control h-auto py-5 px-6 border-0 rounded-lg font-size-h6" name="cpassword" placeholder="Re-enter your password" value="" />
											</div>
										</div>
									</div>
								</div>
								<!--end: Wizard Step 3-->
								<!--begin: Wizard Step 4-->
								<div class="pb-5" data-wizard-type="step-content">
									<!--begin::Title-->
									<div class="pt-lg-0 pt-5 pb-15">
										<h3 class="font-weight-bolder text-dark font-size-h2 font-size-h1-lg">Complete</h3>
										<div class="text-muted font-weight-bold font-size-h4">Complete Your Signup And Become A Member!</div>
									</div>
									<div id="confirm-form">
									</div>
								</div>
								<!--end: Wizard Step 4-->
								<!--begin: Wizard Actions-->
								<div class="d-flex justify-content-between pt-3">
									<div class="mr-2">
										<button type="button" class="btn btn-light-primary font-weight-bolder font-size-h6 pl-6 pr-8 py-4 my-3 mr-3" data-wizard-type="action-prev">
										<span class="svg-icon svg-icon-md mr-1">
											<!--begin::Svg Icon | path:assets/media/svg/icons/Navigation/Left-2.svg-->
											<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
												<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
													<polygon points="0 0 24 0 24 24 0 24" />
													<rect fill="#000000" opacity="0.3" transform="translate(15.000000, 12.000000) scale(-1, 1) rotate(-90.000000) translate(-15.000000, -12.000000)" x="14" y="7" width="2" height="10" rx="1" />
													<path d="M3.7071045,15.7071045 C3.3165802,16.0976288 2.68341522,16.0976288 2.29289093,15.7071045 C1.90236664,15.3165802 1.90236664,14.6834152 2.29289093,14.2928909 L8.29289093,8.29289093 C8.67146987,7.914312 9.28105631,7.90106637 9.67572234,8.26284357 L15.6757223,13.7628436 C16.0828413,14.136036 16.1103443,14.7686034 15.7371519,15.1757223 C15.3639594,15.5828413 14.7313921,15.6103443 14.3242731,15.2371519 L9.03007346,10.3841355 L3.7071045,15.7071045 Z" fill="#000000" fill-rule="nonzero" transform="translate(9.000001, 11.999997) scale(-1, -1) rotate(90.000000) translate(-9.000001, -11.999997)" />
												</g>
											</svg>
											<!--end::Svg Icon-->
										</span>Previous</button>
									</div>
									<div>
										<button class="btn btn-primary font-weight-bolder font-size-h6 pl-5 pr-8 py-4 my-3" data-wizard-type="action-submit" type="submit" id="kt_login_signup_form_submit_button">Submit
										<span class="svg-icon svg-icon-md ml-2">
											<!--begin::Svg Icon | path:assets/media/svg/icons/Navigation/Right-2.svg-->
											<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
												<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
													<polygon points="0 0 24 0 24 24 0 24" />
													<rect fill="#000000" opacity="0.3" transform="translate(8.500000, 12.000000) rotate(-90.000000) translate(-8.500000, -12.000000)" x="7.5" y="7.5" width="2" height="9" rx="1" />
													<path d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997)" />
												</g>
											</svg>
											<!--end::Svg Icon-->
										</span></button>
										<button type="button" class="btn btn-success font-weight-bolder font-size-h6 pl-8 pr-4 py-4 my-3" data-wizard-type="action-next">Next Step
										<span class="svg-icon svg-icon-md ml-1">
											<!--begin::Svg Icon | path:assets/media/svg/icons/Navigation/Right-2.svg-->
											<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
												<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
													<polygon points="0 0 24 0 24 24 0 24" />
													<rect fill="#000000" opacity="0.3" transform="translate(8.500000, 12.000000) rotate(-90.000000) translate(-8.500000, -12.000000)" x="7.5" y="7.5" width="2" height="9" rx="1" />
													<path d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997)" />
												</g>
											</svg>
											<!--end::Svg Icon-->
										</span></button>
									</div>
								</div>
								<!--end: Wizard Actions-->
							</form>
							<!--end::Form-->
						</div>
						<!--end::Signin-->
					</div>
					<!--end::Wrapper-->
				</div>
				<!--end::Content-->
			</div>
			<!--end::Login-->
		</div>
		<!--end::Main-->
		<div class="modal" id="pin_code_modal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdrop" aria-hidden="true" >
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                    <div class="modal-header  text-center">
                                        <h5 class="modal-title" id="exampleModalLabel">Enter 6-Digits Verification Code</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <i aria-hidden="true" class="ki ki-close"></i>
                                        </button>
                                    </div>
                                    <div class="modal-body  text-center">
                                        <p>You will receive the 6-digits verification code to your email.</p>
                                        <br /><br />
                                        
                                        <div class="w-60">
                                            <input type="text" id="pincode-input7" >
                                      
                                            <!-- <a href="javascript:void(0);" onclick="resendPin()"  class="font-weight-bold font-size-sm ">Resend Verification code?</a>  style="color: #6993ff !important;" -->
                                            <button id="resendPin" class="btn btn-link font-weight-bold font-size-sm text-decoration-none">Resend Verification code?</button>
                                        </div>
                                        <br />
                                    </div>
                                    <div class="modal-footer text-center">
                                        <button id="cancel" data-dismiss="modal" class="btn btn-light-primary font-weight-bold">Cancel</button>
                                        <button type="click" id="verify" class="btn btn-primary font-weight-bold" >Verify</button>
                                    </div>
                                </div>
                            </div>
                        </div>
		<!--begin::Global Config(global config for global JS scripts)-->
		<script>var KTAppSettings = { "breakpoints": { "sm": 576, "md": 768, "lg": 992, "xl": 1200, "xxl": 1400 }, "colors": { "theme": { "base": { "white": "#ffffff", "primary": "#3699FF", "secondary": "#E5EAEE", "success": "#1BC5BD", "info": "#8950FC", "warning": "#FFA800", "danger": "#F64E60", "light": "#E4E6EF", "dark": "#181C32" }, "light": { "white": "#ffffff", "primary": "#E1F0FF", "secondary": "#EBEDF3", "success": "#C9F7F5", "info": "#EEE5FF", "warning": "#FFF4DE", "danger": "#FFE2E5", "light": "#F3F6F9", "dark": "#D6D6E0" }, "inverse": { "white": "#ffffff", "primary": "#ffffff", "secondary": "#3F4254", "success": "#ffffff", "info": "#ffffff", "warning": "#ffffff", "danger": "#ffffff", "light": "#464E5F", "dark": "#ffffff" } }, "gray": { "gray-100": "#F3F6F9", "gray-200": "#EBEDF3", "gray-300": "#E4E6EF", "gray-400": "#D1D3E0", "gray-500": "#B5B5C3", "gray-600": "#7E8299", "gray-700": "#5E6278", "gray-800": "#3F4254", "gray-900": "#181C32" } }, "font-family": "Poppins" };
	</script>
		<!--end::Global Config-->
		<!--begin::Global Theme Bundle(used by all pages)-->
		<script src="assets/plugins/global/plugins.bundle.js"></script>
		<script src="assets/plugins/custom/prismjs/prismjs.bundle.js"></script>
		<script src="assets/js/scripts.bundle.js"></script>
		<!--end::Global Theme Bundle-->
		<!--begin::Page Scripts(used by this page)-->
		<script src="assets/js/pages/custom/login/login-3.js"></script>
		<script src="assets/plugins/custom/bootstrap-pincode-input-master/js/bootstrap-pincode-input.js"></script>
		<script type="text/javascript">
			var user_id;
 			user_id="<?php echo ('8'.substr(time(),3).rand(10,99));?>";
 			$('input[name="username"]').val(user_id);
		</script>
		<!--end::Page Scripts-->
	</body>
	<!--end::Body-->
</html>

<script src="/public/js/modules/account.js"></script>