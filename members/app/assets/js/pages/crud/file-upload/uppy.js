"use strict";

// Class definition
var KTUppy = function () {
	var Tus = Uppy.XHRUpload;
	const ProgressBar = Uppy.ProgressBar;
	const StatusBar = Uppy.StatusBar;
	const FileInput = Uppy.FileInput;
	const Informer = Uppy.Informer;
	const Form =  Uppy.Form;

	// to get uppy companions working, please refer to the official documentation here: https://uppy.io/docs/companion/
	const Dashboard = Uppy.Dashboard;
	const Dropbox = Uppy.Dropbox;
	const GoogleDrive = Uppy.GoogleDrive;
	const Instagram = Uppy.Instagram;
	const Webcam = Uppy.Webcam;

	// Private functions


var initUppy1 = function(kyc_id){
		


		var id = '#kt_uppy_1';

		var options = {
			proudlyDisplayPoweredByUppy: false,
			target: id,
			inline: true,
			replaceTargetContent: true,
			showProgressDetails: true,
			note: 'Images only, 1 image, up to 1 MB',
			height: 200,
			width: 600,
			browserBackButtonClose: true,
			hidePauseResumeButton: true,
  			hideCancelButton: true,
			// hideUploadButton: true,
		}

		var uppyDashboard = Uppy.Core({
			autoProceed: false,
			restrictions: {
				maxFileSize: 1000000, // 1mb
				maxNumberOfFiles: 1,
				minNumberOfFiles: 1,
				allowedFileTypes: ['.jpg', '.jpeg', '.png']
			},
			meta: {
            	kyc_id: kyc_id,
            	count:1
        	},
		});

		uppyDashboard.use(Dashboard, options);
		uppyDashboard.use(Tus, { 
			endpoint:'controller/upload.php', 
			method:'post',
			formData: true,
			fieldName: 'files[]'
		});
		uppyDashboard.use(Webcam, { 
			target: Dashboard,
			mirror: true,
			modes: [
		    'picture'
		  	],
		  	videoConstraints: {
			    facingMode: 'environment',
			 },
		});
		uppyDashboard.on('upload-success', (file, response) => {
			// alert(response.body);
		uppyDashboard.close();
		// KTUppy.init();
		});

		// $('.uppy-Dashboard-progressindicators').hide();
	}

	var initUppy2 = function(kyc_id){
		


		var id = '#kt_uppy_2';

		var options = {
			proudlyDisplayPoweredByUppy: false,
			target: id,
			inline: true,
			replaceTargetContent: true,
			showProgressDetails: true,
			note: 'Images only, 1 image, up to 1 MB',
			height: 200,
			width: 600,
			browserBackButtonClose: true,
			hidePauseResumeButton: true,
  			hideCancelButton: true,
			// hideUploadButton: true,
		}

		var uppyDashboard = Uppy.Core({
			autoProceed: false,
			restrictions: {
				maxFileSize: 1000000, // 1mb
				maxNumberOfFiles: 1,
				minNumberOfFiles: 1,
				allowedFileTypes: ['.jpg', '.jpeg', '.png']
			},
			meta: {
            	kyc_id: kyc_id,
            	count:2
        	},
		});

		uppyDashboard.use(Dashboard, options);
		uppyDashboard.use(Tus, { 
			endpoint:'controller/upload.php', 
			method:'post',
			formData: true,
			fieldName: 'files[]'
		});
		uppyDashboard.use(Webcam, { 
			target: Dashboard,
			mirror: true,
			modes: [
		    'picture'
		  	],
		  	videoConstraints: {
			    facingMode: 'environment',
			 },
		});
		uppyDashboard.on('upload-success', (file, response) => {
			// alert(response.body);
		uppyDashboard.close();
		// KTUppy.init();
		});

		// $('.uppy-Dashboard-progressindicators').hide();
	}


	return {
		// public functions
		init: function(kyc_id,status) {
		if(kyc_id!==null && status!='S' && status!='P'){
			initUppy1(kyc_id);
			initUppy2(kyc_id);
		}
		}
	};
}();

// KTUtil.ready(function() {
// 	KTUppy.init();
// });
