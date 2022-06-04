<div class="subheader py-2 py-lg-6 subheader-transparent" id="kt_subheader">
	<div class="container d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
		<div class="d-flex align-items-center flex-wrap mr-1">
			<button class="burger-icon burger-icon-left mr-4 d-inline-block d-lg-none" id="kt_subheader_mobile_toggle">
										<span></span>
									</button>
			<div class="d-flex align-items-baseline flex-wrap mr-5">
				<h5 class="text-dark font-weight-bold my-1 mr-5">Profile</h5>
			</div>
		</div>
	</div>
</div>

<div class="d-flex flex-column-fluid">
	<div class="container px-0">
		<div class="d-flex flex-row">
			<!--begin::Aside-->
		<div class="flex-row-auto offcanvas-mobile w-300px w-xl-350px" id="kt_profile_aside">
			<div class="card card-custom card-stretch gutter-b">
				<div class="card-body pt-15">
					<div class="text-center mb-10">
						<div class="symbol symbol-60 symbol-circle symbol-xl-90 image">
							<div class="symbol-label" style="background-image:url('../../images/user_images/default.png')"></div>
							<i class="symbol-badge symbol-badge-bottom bg-success"></i>
						</div>
						<h4 class="font-weight-bold my-2 full_name text-capitalize"></h4>
						<div class="text-muted mb-2 user_type"></div>
						<span class="label label-light-warning label-inline font-weight-bold label-lg">Active</span>
					</div>
					<!--<div class="mb-10 text-center">-->
					<!--	<a href="#" class="btn btn-icon btn-circle btn-light-facebook mr-2">-->
					<!--		<i class="socicon-facebook"></i>-->
					<!--	</a>-->
					<!--	<a href="#" class="btn btn-icon btn-circle btn-light-twitter mr-2">-->
					<!--		<i class="socicon-twitter"></i>-->
					<!--	</a>-->
					<!--	<a href="#" class="btn btn-icon btn-circle btn-light-google">-->
					<!--		<i class="socicon-google"></i>-->
					<!--	</a>-->
					<!--</div>-->
					<div class="nav nav-tabs">
						<!-- <a data-toggle="tab" href="#info_tab" class="btn btn-hover-light-primary font-weight-bold py-3 px-6 mb-2 text-center btn-block active">Profile Overview</a> -->
						<a data-toggle="tab" href="#info_tab" name="info_tab" class="btn btn-hover-light-primary font-weight-bold py-3 px-6 mb-2 text-center btn-block">Personal Info</a>
						<a data-toggle="tab" href="#contact_tab" name="contact_tab" class="btn btn-hover-light-primary font-weight-bold py-3 px-6 mb-2 text-center btn-block contact-info">Contact Info</a>
						<a data-toggle="tab" href="#account_tab" name="account_tab" class="btn btn-hover-light-primary font-weight-bold py-3 px-6 mb-2 text-center btn-block">Account Info</a>
						<a data-toggle="tab" href="#changepass_tab" name="changepass_tab" class="btn btn-hover-light-primary font-weight-bold py-3 px-6 mb-2 text-center btn-block">Change Password</a>
						
					</div>
				</div>
			</div>
		</div>
									<!--end::Aside-->
									<div class="flex-row-fluid ml-lg-8 card-stretch" id="tab_personal_info">
										<div class="tab-content ">
											<!-- First Tab -->
											<div class="tab-pane" id="info_tab" role="tabpanel" aria-labelledby="info-tab">
												<form class="form" id="personal_info_form">
													<div class="card card-custom h-xl-600px">
															<div class="card-header py-3">
																<div class="card-title align-items-start flex-column">
																	<h3 class="card-label font-weight-bolder text-dark">Personal Information</h3>
																	<span class="text-muted font-weight-bold font-size-sm mt-1">Update your personal information</span>
																</div>
																<div class="card-toolbar">
																	<button type="submit" class="btn btn-warning mr-2" id="submit_personal_info">Save Changes</button>
																</div>
															</div>
															<div class="card-body">
																<div class="row  d-flex justify-content-center">
																	<label class="col-xl-3"></label>
																	<div class="col-lg-9 col-xl-6">
																		<h5 class="font-weight-bold mb-6">User Info</h5>
																	</div>
																</div>
																<div class="form-group row  d-flex justify-content-center" >
																	<label class="col-xl-3 col-lg-3 col-form-label">Avatar</label>
																	<div class="col-lg-9 col-xl-6">
																		<div class="d-flex align-items-center flex-column">
																			<div class="image-input image-input-outline" id="kt_profile_avatar" style="background-image: url(assets/media/users/blank.png)">
																				<div class="image-input-wrapper" style="background-image: url()"></div>
																				<label class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" data-action="change" data-toggle="tooltip" title="" data-original-title="Change avatar">
																					<i class="fa fa-pen icon-sm text-muted"></i>
																					<input type="file" id="profile_avatar" name="profile_avatar" accept=".png, .jpg, .jpeg" />
																					<input type="hidden" name="profile_avatar_remove" />
																				</label>
																				<!-- <span class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" data-action="cancel" data-toggle="tooltip" title="Cancel avatar">
																					<i class="ki ki-bold-close icon-xs text-muted"></i>
																				</span>
																				<span class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" data-action="remove" data-toggle="tooltip" title="Remove avatar">
																					<i class="ki ki-bold-close icon-xs text-muted"></i>
																				</span> -->
																			</div>
																			<span class="form-text text-muted my-3">Allowed file types: png, jpg, jpeg.</span>
			                                                                  <button type="button" class="btn btn-light btn-shadow font-weight-bold mr-2 py-3 px-14 btn-pill btn-sm" data-toggle="modal" data-target="#exampleModalCustomScrollable">Choose Avatar</button>
																		</div>

																	</div>
																</div>
																<div class="form-group row  d-flex justify-content-center">
																	<label class="col-xl-3 col-lg-3 col-form-label">First Name</label>
																	<div class="col-lg-9 col-xl-6">
																		<input class="form-control form-control-lg form-control-solid" type="text" value="" required name="fname" pattern="[^\s][a-zA-ZÀ-ž-.\s]{0,19}$" placeholder="First Name" />
																	</div>
																</div>
																<div class="form-group row  d-flex justify-content-center">
																	<label class="col-xl-3 col-lg-3 col-form-label">Middle Name</label>
																	<div class="col-lg-9 col-xl-6">
																		<input class="form-control form-control-lg form-control-solid" type="text" value="" name="mname" pattern="[^\s][a-zA-ZÀ-ž-.\s]{0,19}$" placeholder="Middle Name" />
																		<span class="form-text text-muted"></span>
																	</div>
																</div>
																<div class="form-group row  d-flex justify-content-center">
																	<label class="col-xl-3 col-lg-3 col-form-label">Last Name</label>
																	<div class="col-lg-9 col-xl-6">
																		<input class="form-control form-control-lg form-control-solid" type="text" value="" required name="lname" pattern="[^\s][a-zA-ZÀ-ž-.\s]{0,19}$" placeholder="Last Name" />
																	</div>
																</div>
															</div>
													</div>
												</form>
										  	</div>




										 <!-- Second Tab -->
										   	<div class="tab-pane" id="contact_tab" role="tabpanel" aria-labelledby="contact-tab">
													<form class="form" id="contact_info_form">
														<div class="card card-custom h-xl-600px">
															<div class="card-header py-3">
																<div class="card-title align-items-start flex-column">
																	<h3 class="card-label font-weight-bolder text-dark">Contact Information</h3>
																	<span class="text-muted font-weight-bold font-size-sm mt-1">Update your address and contact</span>
																</div>
																<div class="card-toolbar">
																	<button type="submit" class="btn btn-warning mr-2" id="submit_contact_info">Save Changes</button>
																</div>
															</div>
															<div class="card-body">
																<div class="row  d-flex justify-content-center">
																	<label class="col-xl-3"></label>
																	<div class="col-lg-9 col-xl-6">
																		<h5 class="font-weight-bold mb-6">Address</h5>
																	</div>
																</div>
																<div class="form-group row  d-flex justify-content-center">
																	<label class="col-xl-3 col-lg-3 col-form-label">Country</label>
																	<div class="col-lg-9 col-xl-6">
																			<select class="form-control form-control-lg form-control-solid" name="country">
																				<option phonecode="63" value="PH" selected>Philippines</option>
																			</select>
																	</div>
																</div>
																<div class="form-group row  d-flex justify-content-center">
																	<label class="col-xl-3 col-lg-3 col-form-label">City</label>
																	<div class="col-lg-9 col-xl-6">
																			<input class="form-control form-control-lg form-control-solid" type="text" value="" name="city" pattern="[^\s][a-zA-ZÀ-ž-.\s]{0,19}$" placeholder="City"/>
																	</div>
																</div>
																<div class="row  d-flex justify-content-center">
																	<label class="col-xl-3"></label>
																	<div class="col-lg-9 col-xl-6">
																		<h5 class="font-weight-bold mb-6">Contact Info</h5>
																	</div>
																</div>
																<!-- <div class="form-group row  d-flex justify-content-center">
						                                            <label class="col-xl-3 col-lg-3 col-form-label">Contact Number</label>
						                                            <div class="col-lg-9 col-xl-6">
						                                                <div class="input-group input-group-lg input-group-solid">
						                                                    <div class="input-group-prepend">
						                                                        <span class="input-group-text">
						                                                            <select class="form-control" name="phonecode">
						                                                            </select>
						                                                        </span>
						                                                    </div>
						                                                   <input type="text" class="form-control form-control-lg form-control-solid" id="student_mobile" name="mobile"  tba_profile_mobile placeholder="Phone"/>
						                                                    <div class="input-group-prepend">
						                                                    </div>
						                                                </div>
						                                                <div>
						                                                    <span class="form-text text-muted">Phone number: <code>(999) 999-9999</code></span>
						                                                </div>
						                                            </div>
						                                        </div> -->
							                                      
							                                        	<div class="form-group row  d-flex justify-content-center">
																			<label class="col-xl-3 col-lg-3 col-form-label">Mobile Number</label>
																			<div class="col-lg-9 col-xl-6">
																				 <!--  	<div class="col-4">
																						<select class="form-control form-control-lg form-control-solid" name="phonecode"></select>
							                                        				</div> 
							                                        			<div class="col-8"> -->
																					<div class="input-group input-group-lg input-group-solid">
																						<div class="input-group-prepend">
																							<span class="input-group-text">
																								<i class="fas fa-mobile-alt"></i>
																							</span>
																						</div>
																						<input type="text" class="form-control form-control-lg form-control-solid" id="mobile" name="mobile" placeholder="Mobile number" value="+63"/>
																						<!-- <div class="input-group-append">
																							<button class="btn btn-primary verify-this verify_mobile" data-verify="verify_mobile" type="button">Verify</button>
																						</div> -->
																					</div>
																				<!-- </div> -->
																				<span class="form-text text-muted">Mobile number</span>
									                                        </div> 
								                                        </div>
						                                        
																
																<div class="form-group row  d-flex justify-content-center">
																	<label class="col-xl-3 col-lg-3 col-form-label">Email Address</label>
																	<div class="col-lg-9 col-xl-6">
																		<div class="input-group input-group-lg input-group-solid">
																			<div class="input-group-prepend">
																				<span class="input-group-text">
																					<i class="la la-at"></i>
																				</span>
																			</div>
																			<input type="text" class="form-control form-control-lg form-control-solid" value="" required  name="email" placeholder="Email" />
																			<!-- <div class="spinner spinner-sm spinner-success spinner-right"></div> -->
																			<div class="input-group-append">
																				<button class="btn btn-primary verify-this verify_email" data-verify="verify_email" type="button">Verify</button>
																			</div>
																		</div>
																		<span class="form-text text-muted">We'll never share your email with anyone else.</span>
																	</div>
																</div>
															</div>
														</div>
													</form>
										  	</div>


										  	<!-- Third Tab -->
											<div class="tab-pane" id="account_tab" role="tabpanel" aria-labelledby="account-tab">
													<form class="form" id="account_info_form">
														<div class="card card-custom h-xl-600px">
															<div class="card-header py-3">
																<div class="card-title align-items-start flex-column">
																	<h3 class="card-label font-weight-bolder text-dark">Account Information</h3>
																	<span class="text-muted font-weight-bold font-size-sm mt-1">Change your account settings</span>
																</div>
																<div class="card-toolbar">
																	<button type="submit" class="btn btn-warning mr-2" id="submit_account_info">Save Changes</button>
																	<!-- <button type="reset" class="btn btn-secondary">Cancel</button> -->
																</div>
															</div>
															<div class="card-body">
																<div class="row  d-flex justify-content-center">
																	<label class="col-xl-3"></label>
																	<div class="col-lg-9 col-xl-6">
																		<h5 class="font-weight-bold mb-6">Account</h5>
																	</div>
																</div>

																<div class="form-group row  d-flex justify-content-center">
																	<label class="col-xl-3 col-lg-3 col-form-label">User ID</label>
																	<div class="col-lg-9 col-xl-6">
																			<input class="form-control form-control-lg form-control-solid" type="text" value="" disabled name="username" pattern="^[a-z0-9-_.]{8,15}$" placeholder="Username"/>
																	</div>
																</div>
																<div class="form-group row d-flex justify-content-center">
	                                                                <label class="col-xl-3 col-lg-3 col-form-label">Birth date</label>
																	<div class="col-lg-9 col-xl-6">
																			<input class="form-control form-control-lg form-control-solid" type="text" value="" id="bday" name="bday" placeholder="Birth date"/>
																			 <span class="form-text text-muted">Date format: <code>mm/dd/yyyy</code></span>
																	</div>
	                                                            </div>
															</div>
														</div>
													</form>
											</div>


										  	<!-- Fourth Tab -->
										   	<div class="tab-pane" id="changepass_tab" role="tabpanel" aria-labelledby="changepass-tab">
													<form class="form" id="change_pass_form">
														<div class="card card-custom h-xl-600px">
															<div class="card-header py-3">
																<div class="card-title align-items-start flex-column">
																	<h3 class="card-label font-weight-bolder text-dark">Change Password</h3>
																	<span class="text-muted font-weight-bold font-size-sm mt-1">Change your account password</span>
																</div>
																<div class="card-toolbar">
																	<button type="submit" class="btn btn-warning mr-2" id="submit_change_pass">Confirm</button>
																	<!-- <button type="reset" class="btn btn-secondary">Cancel</button> -->
																</div>
															</div>
															<div class="card-body">
																<div class="form-group row  d-flex justify-content-center">
																	<label class="col-xl-3 col-lg-3 col-form-label text-alert">Current Password</label>
																	<div class="col-lg-9 col-xl-6">
																		<input type="password" class="form-control form-control-lg form-control-solid mb-2" value="" name="c_password" placeholder="Current password" required/>
																		<a href="javascript:void(0)" class="text-sm font-weight-bold" id="f_password">Forgot password ?</a>
																	</div>
																</div>
																<div class="form-group row  d-flex justify-content-center">
																	<label class="col-xl-3 col-lg-3 col-form-label text-alert">New Password</label>
																	<div class="col-lg-9 col-xl-6">
																		<input type="password" class="form-control form-control-lg form-control-solid" value="" name="n_password" placeholder="New password" required minlength="8"/>
																	</div>
																</div>
																<div class="form-group row  d-flex justify-content-center">
																	<label class="col-xl-3 col-lg-3 col-form-label text-alert">Verify Password</label>
																	<div class="col-lg-9 col-xl-6">
																		<input type="password" class="form-control form-control-lg form-control-solid" value="" name="v_password" placeholder="Verify password" required minlength="8"/>
																	</div>
																</div>
															</div>
														</div>
													</form>
										  	</div>

										  	<!-- Fifth Tab -->
											<div class="tab-pane" id="aff_tab" role="tabpanel" aria-labelledby="aff-tab">
											  		<div class="card card-custom h-xl-600px">
															<div class="card-header py-3">
																<div class="card-title align-items-start flex-column">
																	<h3 class="card-label font-weight-bolder text-dark">Affiliate Account</h3>
																	<span class="text-muted font-weight-bold font-size-sm mt-1">links</span>
																</div>
															</div>
															<div class="card-body">
																<div class="d-flex flex-column flex-grow-1">
						                                            <div class="d-flex flex-wrap mb-4"><span class="text-dark-50 text-hover-primary font-weight-bold mr-lg-8 mr-5 mb-lg-0 mb-2">Your Affiliate Links</span>
						                                            </div>
						                                        </div>
															    <div class="d-flex flex-wrap justify-content-between">
										                            <div class="d-flex flex-column flex-grow-1">
										                                <div class="d-flex flex-wrap mb-4">
										                                  	<div class=" alert alert-custom alert-secondary alert-shadow fade show gutter-b p-1 w-100" role="alert">
									                                            
									                                        </div>
										                                </div>
										                            </div>
										                        </div>
															</div>
													</div>
											</div>

											<!-- six tab -->
											<div class="tab-pane" id="bank_tab" role="tabpanel" aria-labelledby="bank-tab">
													<form class="form" id="bank_info_form">
														<div class="card card-custom h-xl-600px">
															<div class="card-header py-3">
																<div class="card-title align-items-start flex-column">
																	<h3 class="card-label font-weight-bolder text-dark">Bank Information</h3>
																	<span class="text-muted font-weight-bold font-size-sm mt-1">Change your bank details</span>
																</div>
																<div class="card-toolbar">
																	<button type="submit" class="btn btn-warning mr-2">Save Changes</button>
																	<!-- <button type="reset" class="btn btn-secondary">Cancel</button> -->
																</div>
															</div>
															<div class="card-body">
																<div class="row  d-flex justify-content-center">
																	<label class="col-xl-3"></label>
																	<div class="col-lg-9 col-xl-6">
																		<h5 class="font-weight-bold mb-6">Bank Details</h5>
																	</div>
																</div>

																<div class="form-group row  d-flex justify-content-center">
																	<label class="col-xl-3 col-lg-3 col-form-label">Account Name</label>
																	<div class="col-lg-9 col-xl-6">
																			<input class="form-control form-control-lg form-control-solid" type="text" name="acc_name" placeholder="Enter account name"/>
																	</div>
																</div>
																<div class="form-group row  d-flex justify-content-center">
																	<label class="col-xl-3 col-lg-3 col-form-label">Account Number</label>
																	<div class="col-lg-9 col-xl-6">
																			<input class="form-control form-control-lg form-control-solid" type="text" name="acc_number" placeholder="Enter account number"/>
																	</div>
																</div>
																<div class="form-group row  d-flex justify-content-center">
																	<label class="col-xl-3 col-lg-3 col-form-label">Mobile</label>
																	<div class="col-lg-9 col-xl-6">
																			<input class="form-control form-control-lg form-control-solid" type="text" name="acc_mobile" placeholder="Enter mobile"/>
																	</div>
																</div>
																<div class="form-group row  d-flex justify-content-center">
																	<label class="col-xl-3 col-lg-3 col-form-label">Mode of Payment</label>
																	<div class="col-lg-9 col-xl-6">
																			<select class="form-control form-control-lg form-control-solid" name="mop">
																				<option value="">Select MOP</option>
																			</select>
																	</div>
																</div>
																
															</div>
														</div>
													</form>
											</div>
											<!-- Third Tab -->
											<div class="tab-pane" id="shipping_tab" role="tabpanel" aria-labelledby="bank-tab">
													<form class="form" id="bank_info_form">
														<div class="card card-custom h-xl-600px">
															<div class="card-header py-3">
																<div class="card-title align-items-start flex-column">
																	<h3 class="card-label font-weight-bolder text-dark">Shipping Addresses</h3>
																	<span class="text-muted font-weight-bold font-size-sm mt-1">Change your bank details</span>
																</div>
																<div class="card-toolbar">
																	<!-- <button type="submit" class="btn btn-warning mr-2">Save Changes</button> -->
																	<!-- <button type="reset" class="btn btn-secondary">Cancel</button> --> <!-- data-toggle="modal" data-target="#add_address" -->
																	<a href="javascript:void(0)" class="btn btn-warning font-weight-bolder">
																		<span class="svg-icon svg-icon-md">
																			<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
																			    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
																			        <rect x="0" y="0" width="24" height="24"/>
																			        <circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10"/>
																			        <path d="M11,11 L11,7 C11,6.44771525 11.4477153,6 12,6 C12.5522847,6 13,6.44771525 13,7 L13,11 L17,11 C17.5522847,11 18,11.4477153 18,12 C18,12.5522847 17.5522847,13 17,13 L13,13 L13,17 C13,17.5522847 12.5522847,18 12,18 C11.4477153,18 11,17.5522847 11,17 L11,13 L7,13 C6.44771525,13 6,12.5522847 6,12 C6,11.4477153 6.44771525,11 7,11 L11,11 Z" fill="#000000"/>
																			    </g>
																			</svg>
																		</span>Add New Address</a>
																</div>
															</div>
															<div class="card-body px-md-30">
																
															</div>
														</div>
													</form>
											</div>

										</div>
									</div>

								</div>
							</div>
							<!--end::Container-->
						</div>
						<!--end::Entry-->
<!-- Modal-->

<div class="modal fade" id="exampleModalCustomScrollable" tabindex="-1" role="dialog" aria-labelledby="staticBackdrop" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Choose Avatar</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <i aria-hidden="true" class="ki ki-close"></i>
                </button>
            </div>
            <div class="modal-body">
                <div data-scroll="true" data-height="500">
                    <div class="row gutter-b" id="avatars">

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    <div class="modal px-0" id="pin_code_modal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdrop" aria-hidden="true" >
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                    <div class="modal-header  text-center">
                                        <h5 class="modal-title" id="exampleModalLabel">Enter 6-Digits Verification Code</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <i aria-hidden="true" class="ki ki-close"></i>
                                        </button>
                                    </div>
                                    <div class="modal-body  text-center">
                                        <p>You will receive the 6-digits verification code to your given email.</p>
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
                                        <button type="submit" id="verify" class="btn btn-primary font-weight-bold" >Verify</button>
                                    </div>
                                </div>
                            </div>
    </div>

<div class="modal fade" id="add_address" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdrop" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title title-header"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <i aria-hidden="true" class="ki ki-close"></i>
                </button>
            </div>
           	<form class="form" id="shipping_address_form">
            <div class="modal-body">
					<div class="card-body p-0">
						<div class="form-group">
				    		<label>Full Name:</label>
				    		<input type="text" class="form-control" placeholder="Enter full name" name="addr_name"/>
				    		<span class="form-text text-muted">Please enter your full name</span>
				   		</div>
				  		<div class="form-group row">
				   			<div class="col-lg-6">
				    			<label>Email  (optional):</label>
				    			<input type="text" class="form-control" placeholder="Enter email" name="addr_email"/>
				    			<span class="form-text text-muted">Please enter your email</span>
				   			</div>
						   <div class="col-lg-6">
						    	<label>Contact Number:</label>
						    	<input type="text" class="form-control" placeholder="Enter contact number" name="addr_mobile"/>
						    	<span class="form-text text-muted">Please enter your contact number</span>
						   </div>
				  		</div>
				  		<div class="form-group row">
				   			<div class="col-lg-6">
						    		<label>Region:</label>
						    		<select class="form-control" name="addr_region">
										<option value="">Select Region</option>
									</select>
						    		<!-- <div class="input-group">
						     			<input type="text" class="form-control" placeholder="Enter your address" name="address"/>
						     			<div class="input-group-append"><span class="input-group-text"><i class="la la-map-marker"></i></span></div>
						    		</div> -->
						    		<span class="form-text text-muted">Please select your region</span>
						  	</div>
						  	<div class="col-lg-6">
						    		<label>Province:</label>
						    		<select class="form-control" name="addr_province">
										<option value="">Select Province</option>
									</select>
						    		<span class="form-text text-muted">Please select your province</span>
						  	</div>
						</div>
						<div class="form-group row">
				   			<div class="col-lg-6">
						    		<label>City:</label>
						    		<select class="form-control" name="addr_city">
										<option value="">Select City</option>
									</select>
						    		<span class="form-text text-muted">Please select your city</span>
						  	</div>
						  	<div class="col-lg-6">
						    		<label>Barangay:</label>
						    		<select class="form-control" name="addr_barangay">
										<option value="">Select Barangay</option>
									</select>
						    		<span class="form-text text-muted">Please select your barangay</span>
						  	</div>
						</div>
						<div class="form-group">
						   	<div class="form-group">
						   		<label>Street Name, Building, House No:</label>
							   	<div class="input-group">
							    		<input type="text" class="form-control" placeholder="Street name, Building, House No." name="addr_street"/>
							    		<div class="input-group-append"><span class="input-group-text"><i class="la la-bookmark-o"></i></span></div>
							   	</div>
						    	<span class="form-text text-muted">Please enter your Street name, Building, House No.</span>
							</div>
						</div>
						<div class="form-group row">
				   			<div class="col-lg-6">
						   		<div class="form-group">
						   			<label>Postal code:</label>
							     	<input type="text" class="form-control" placeholder="Enter your postcode" name="postal"/>
						    		<span class="form-text text-muted">Please enter your postal code</span>
								</div>
							</div>
							<div class="col-lg-6">
								<div class="form-group row">
								   	<div class="col-lg-6">
								    	<label>Label as:</label>
								    	<div class="radio-inline">
								     		<label class="radio radio-solid">
								      			<input type="radio" name="addr_type" id="label-HOME" checked="checked" value="HOME"/>
								      			<span></span>Home
								     		</label>
								     		<label class="radio radio-solid">
								      			<input type="radio" name="addr_type" id="label-WORK" value="WORK"/>
								      			<span></span>Work
								     		</label>
								   		</div>
								   </div>
								</div>
							</div>
						</div>
						<!-- <div class="form-group">
						 	<div class="checkbox-list">
						        <label class="checkbox">
						            <input type="checkbox" name="addr_default"/>
						            <span></span>
						            Set as default address
						        </label>
						    </div>
						</div> -->
					</div>
            </div>
            <div class="modal-footer">
                <button type="reset" class="btn btn-light-primary font-weight-bold" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary font-weight-bold">Submit</button>
            </div>
			</form>
        </div>
    </div>
</div>
						<script src="assets/js/pages/custom/profile/profile.js"></script>
						<script src="assets/js/pages/crud/forms/widgets/clipboard.js"></script>
<script>
	var address='new_address';
	var shipping_addr="";
	            $('#kt_profile_aside > div > div > div.nav.nav-tabs.nav-bold.navi.navi-bold.navi-hover.navi-active.navi-link-rounded > div').on('click', function(){
				// $('#kt_profile_aside > div > div > div.nav.nav-tabs.nav-bold.navi.navi-bold.navi-hover.navi-active.navi-link-rounded > div > a').removeClass('active');
				// if($('#kt_profile_aside').hasClass('offcanvas-mobile-on')){
				// 	$('#kt_profile_aside').removeClass('offcanvas-mobile-on').addClass('offcanvas-mobile');
				// 	$('.offcanvas-mobile-overlay').remove();
				// 	$('#kt_body').removeAttr('data-offcanvas-offcanvas');
				// }
				// $('#kt_subheader_mobile_toggle').trigger('click');

				// $('#'+$(this).attr('id')+'').addClass('active');
	})
</script>