

<div class="container">
	<div class="alert alert-custom alert-white alert-shadow fade show gutter-b" role="alert" style="margin-top: 20px;">
	<div class="alert-icon">
		<span class="svg-icon svg-icon-primary svg-icon-xl">
			<!--begin::Svg Icon | path:assets/media/svg/icons/Tools/Compass.svg-->
			<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
				<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
					<rect x="0" y="0" width="24" height="24"></rect>
					<path d="M7.07744993,12.3040451 C7.72444571,13.0716094 8.54044565,13.6920474 9.46808594,14.1079953 L5,23 L4.5,18 L7.07744993,12.3040451 Z M14.5865511,14.2597864 C15.5319561,13.9019016 16.375416,13.3366121 17.0614026,12.6194459 L19.5,18 L19,23 L14.5865511,14.2597864 Z M12,3.55271368e-14 C12.8284271,3.53749572e-14 13.5,0.671572875 13.5,1.5 L13.5,4 L10.5,4 L10.5,1.5 C10.5,0.671572875 11.1715729,3.56793164e-14 12,3.55271368e-14 Z" fill="#000000" opacity="0.3"></path>
					<path d="M12,10 C13.1045695,10 14,9.1045695 14,8 C14,6.8954305 13.1045695,6 12,6 C10.8954305,6 10,6.8954305 10,8 C10,9.1045695 10.8954305,10 12,10 Z M12,13 C9.23857625,13 7,10.7614237 7,8 C7,5.23857625 9.23857625,3 12,3 C14.7614237,3 17,5.23857625 17,8 C17,10.7614237 14.7614237,13 12,13 Z" fill="#000000" fill-rule="nonzero"></path>
				</g>
			</svg>
			<!--end::Svg Icon-->
		</span>
	</div>
	<div class="alert-text h2">
		<label class="font-weight-bold q_material" id="quiz-name"></label> | <span id="questions-count"></span> Items
		<label class="font-weight-bold q_item" ></label> 
		<label class="font-weight-bold text-right d_limit invisible" style="float: right;"></label>
	</div>
	</div>

	<form id="quiz_form">
		<?php
			$config = new Config();
			$customcrypt = new customCrypt();

			$usercookie = json_decode($customcrypt->getDecrypt($_COOKIE[$config->cookie_user()]), true); 		
		?>
		<input type="hidden" name="user_id" value="<?php echo $usercookie['user_id'] ?>">
		<input type="hidden" id="quiz_id" name="quiz_id" value="">
		<div id="quiz-content" class="accordion accordion-solid accordion-toggle-plus quiz_form_accordion" id="accordionExample3">
			
		</div>
	</form>

	<div class="alert alert-custom alert-white alert-shadow fade show gutter-b" role="alert" style="margin-top: 20px;">
		<div class="alert-text h2">
			<button id="submit-quiz-btn" type="button" class="btn btn-primary btn_submit" style="float: right;">Submit</button>
		</div>
	</div>
	
</div>
