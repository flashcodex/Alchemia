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
							<div class="symbol-label" style="background-image:url('../images/admin_images/default.png')"></div>
							<i class="symbol-badge symbol-badge-bottom bg-success"></i>
						</div>
						<h4 class="font-weight-bold my-2 full_name text-capitalize"></h4>
						<div class="text-muted mb-2 user_type"></div>
						<span class="label label-light-success label-inline font-weight-bold label-lg">Active</span>
					</div>
					<!-- <div class="mb-10 text-center">
						<a href="#" class="btn btn-icon btn-circle btn-light-facebook mr-2">
							<i class="socicon-facebook"></i>
						</a>
						<a href="#" class="btn btn-icon btn-circle btn-light-twitter mr-2">
							<i class="socicon-twitter"></i>
						</a>
						<a href="#" class="btn btn-icon btn-circle btn-light-google">
							<i class="socicon-google"></i>
						</a>
					</div> -->
					<div class="nav nav-tabs">
						<a data-toggle="tab" href="#info_tab" class="btn btn-hover-light-primary font-weight-bold py-3 px-6 mb-2 text-center btn-block active">Personal Info</a>
						<a data-toggle="tab" href="#contact_tab" class="btn btn-hover-light-primary font-weight-bold py-3 px-6 mb-2 text-center btn-block">Contact Info</a>
						<a data-toggle="tab" href="#changepass_tab" class="btn btn-hover-light-primary font-weight-bold py-3 px-6 mb-2 text-center btn-block">Change Password</a>
					</div>
				</div>
			</div>
		</div>
									<!--end::Aside-->
									<div class="flex-row-fluid ml-lg-8 card-stretch" id="tab_personal_info">
										<div class="tab-content ">


											<!-- First Tab -->
											<div class="tab-pane active" id="info_tab" role="tabpanel" aria-labelledby="info-tab">
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
																		</div>

																	</div>
																</div>
																<div class="form-group row  d-flex justify-content-center">
																	<label class="col-xl-3 col-lg-3 col-form-label">Username</label>
																	<div class="col-lg-9 col-xl-6">
																			<input class="form-control form-control-lg form-control-solid username" type="text" value="" disabled name="username" pattern="^[a-z0-9-_.]{8,15}$" placeholder="Username"/>
																	</div>
																</div>
																<div class="form-group row  d-flex justify-content-center">
																	<label class="col-xl-3 col-lg-3 col-form-label">First Name</label>
																	<div class="col-lg-9 col-xl-6">
																		<input class="form-control form-control-lg form-control-solid fname" type="text" value="" required name="fname" pattern="[^\s][a-zA-ZÀ-ž-.\s]{0,19}$" placeholder="First Name" />
																	</div>
																</div>
																<div class="form-group row  d-flex justify-content-center">
																	<label class="col-xl-3 col-lg-3 col-form-label">Middle Name</label>
																	<div class="col-lg-9 col-xl-6">
																		<input class="form-control form-control-lg form-control-solid mname" type="text" value="" name="mname" pattern="[^\s][a-zA-ZÀ-ž-.\s]{0,19}$" placeholder="Middle Name" />
																		<span class="form-text text-muted"></span>
																	</div>
																</div>
																<div class="form-group row  d-flex justify-content-center">
																	<label class="col-xl-3 col-lg-3 col-form-label">Last Name</label>
																	<div class="col-lg-9 col-xl-6">
																		<input class="form-control form-control-lg form-control-solid lname" type="text" value="" required name="lname" pattern="[^\s][a-zA-ZÀ-ž-.\s]{0,19}$" placeholder="Last Name" />
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
																			<select class="form-control form-control-lg form-control-solid country" id="country" name="country">

																			</select>
																	</div>
																</div>
																<div class="form-group row  d-flex justify-content-center">
																	<label class="col-xl-3 col-lg-3 col-form-label">City</label>
																	<div class="col-lg-9 col-xl-6">
																			<input class="form-control form-control-lg form-control-solid city" type="text" value="" name="city" pattern="[^\s][a-zA-ZÀ-ž-.\s]{0,19}$" placeholder="City"/>
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
							                                      
							                                        	<div class="form-group row  d-flex justify-content-center ">
																			<label class="col-xl-3 col-lg-3 col-form-label">Mobile Number</label>
																			<div class="col-lg-9 col-xl-6">
						                                        				<div  class="row">
																				  	<div class="col-4">
																						<select class="form-control form-control-lg form-control-solid phone_code" name="phonecode">
																						</select>
							                                        				</div> 
							                                        			<div class="col-8">
																					<div class="input-group input-group-lg input-group-solid">
																						<input type="text" class="form-control form-control-lg form-control-solid mobile" value="" id="mobile" name="mobile" placeholder="Mobile number" />
																						<div class="input-group-prepend">
																							<span class="input-group-text">
																							<i class="fas fa-mobile-alt"></i>
																							</span>
																						</div>
																					</div>
																				</div>
																				<span class="form-text text-muted">Mobile number</span>
																				</div>
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
																			<input type="text" class="form-control form-control-lg form-control-solid email" value="" required disabled="true" name="email" placeholder="Email" />
																		</div>
																		<span class="form-text text-muted">We'll never share your email with anyone else.</span>
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
																		<!-- <a href="javascript:void(0)" class="text-sm font-weight-bold" id="f_password">Forgot password ?</a> -->
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

										</div>
									</div>

								</div>
							</div>
							<!--end::Container-->
						</div>
						<!--end::Entry-->

<!-- Modal-->
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
                                        <p>You will receive the 6-digits verification code to your given phone number.</p>
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
						<!-- <script src="assets/js/pages/custom/profile/profile.js"></script> -->
						<!-- <script src="assets/js/pages/crud/forms/widgets/clipboard.js"></script> -->
