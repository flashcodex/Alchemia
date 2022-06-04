"use strict";

// Class definition
var KTUppy = function () {
	// const Tus = Uppy.Tus;
	var Tus = Uppy.XHRUpload;
	const ProgressBar = Uppy.ProgressBar;
	const StatusBar = Uppy.StatusBar;
	const FileInput = Uppy.FileInput;
	const Informer = Uppy.Informer;

	// to get uppy companions working, please refer to the official documentation here: https://uppy.io/docs/companion/
	const Dashboard = Uppy.Dashboard;
	const Dropbox = Uppy.Dropbox;
	const GoogleDrive = Uppy.GoogleDrive;
	const Instagram = Uppy.Instagram;
	const Webcam = Uppy.Webcam;

	// Private functions
	var initUppy1 = function(){
	// 	var id = '#kt_uppy_1';

	// 	var options = {
	// 		proudlyDisplayPoweredByUppy: false,
	// 		target: id,
	// 		inline: true,
	// 		replaceTargetContent: true,
	// 		showProgressDetails: true,
	// 		note: 'No filetype restrictions.',
	// 		height: 470,
	// 		metaFields: [
	// 			{ id: 'name', name: 'Name', placeholder: 'file name' },
	// 			{ id: 'caption', name: 'Caption', placeholder: 'describe what the image is about' }
	// 		],
	// 		browserBackButtonClose: true
	// 	}

	// 	var uppyDashboard = Uppy.Core({
	// 		autoProceed: true,
	// 		restrictions: {
	// 			maxFileSize: 1000000, // 1mb
	// 			maxNumberOfFiles: 5,
	// 			minNumberOfFiles: 1
	// 		}
	// 	});

	// 	uppyDashboard.use(Dashboard, options);
	// 	uppyDashboard.use(Tus, { endpoint: 'https://master.tus.io/files/' });
	// 	uppyDashboard.use(GoogleDrive, { target: Dashboard, companionUrl: 'https://companion.uppy.io' });
	// 	uppyDashboard.use(Dropbox, { target: Dashboard, companionUrl: 'https://companion.uppy.io' });
	// 	uppyDashboard.use(Instagram, { target: Dashboard, companionUrl: 'https://companion.uppy.io' });
	// 	uppyDashboard.use(Webcam, { target: Dashboard });
	}

	var initUppy2 = function(product_id){
		var id = '#kt_uppy_2';
		var options = {
			proudlyDisplayPoweredByUppy: false,
			target: id,
			inline: true,
			replaceTargetContent: true,
			showProgressDetails: true,
			note: 'Images only, up to 1 MB',
			height: 200,
			width: 1100,
			browserBackButtonClose: true,
			// hidePauseResumeButton: true,
  			// hideCancelButton: true,
		}

		var uppyDashboard = Uppy.Core({
			autoProceed: true,
			restrictions: {
				maxFileSize: 3000000, // 1mb
				maxNumberOfFiles: 1,
				minNumberOfFiles: 1,
				allowedFileTypes: ['.jpg', '.jpeg', '.png']
			},
			meta: {
            	product_id: product_id
        	},
		});

		uppyDashboard.use(Dashboard, options);
		uppyDashboard.use(Tus, { 
			endpoint:'controller/upload.php', 
			method:'post',
			formData: true,
			fieldName: 'files[]'
		});
		uppyDashboard.on('upload-success', (file, response) => {
			$('#gallery_container > div.col-12.mt-5').remove();
			let remove=$('#gallery_container > div > div > div.row > button:nth-child(1)').length+1;
			let thumbnail=$('#gallery_container > div > div > div.row > button:nth-child(2)').length+1;
			if(response.body!=false){
				$('#gallery_container').append('<div class="col-lg-3 col-6">\
                    <div class="card-body ribbon ribbon-clip ribbon-right px-0">\
	                    <div class="pt-4">\
	                        <div class="bgi-no-repeat bgi-size-cover rounded min-h-200px tba_image" style="background-image: url(../images/product/product-960x960/'+response.body.image+')"></div>\
	                    </div>\
                      	<div class="row">\
                         	<button type="button" class="col btn btn-light-dark btn-sm font-weight-bold m mt-2 mx-3">Remove</button><button type="button" class=" col btn btn-light-dark btn-sm font-weight-bold  mt-2 mx-3">Thumbnail</button>\
                         	</div>\
                       	</div>\
                  	</div>').promise().done(async function(){
                     $('#gallery_container > div:nth-child('+thumbnail+') > div > div.row > button:nth-child(2)').on('click', function(e){
                        e.preventDefault();
                        APPHANDLER.callFunction('gallery','product_thumbnail_gallery',response.body.product_id,response.body.id);
                    });
                 	 $('#gallery_container > div:nth-child('+remove+') > div > div.row > button:nth-child(1)').on('click', function(e){
                 	  	e.preventDefault();
                        APPHANDLER.callFunction('gallery','product_remove_gallery',response.body.product_id,response.body.id);
                 	});
               	});
			}
		uppyDashboard.close();
		KTUppy.init(product_id);
		});
	}

	return {
		// public functions
		init: function(id) {
			// initUppy1();
			initUppy2(id);
			// initUppy3();
			// initUppy4();
			// initUppy5();
			// initUppy6();

			// setTimeout(function() {
			// 	swal.fire({
			// 		"title": "Notice",
			// 		"html": "Uppy demos uses <b>https://master.tus.io/files/</b> URL for resumable upload examples and your uploaded files will be temporarely stored in <b>tus.io</b> servers.",
			// 		"type": "info",
			// 		"buttonsStyling": false,
			// 		"confirmButtonClass": "btn btn-primary",
			// 		"confirmButtonText": "Ok, I understand",
			// 		"onClose": function(e) {
			// 			console.log('on close event fired!');
			// 		}
			// 	});
			// }, 2000);
		}
	};
}();

// KTUtil.ready(function() {
// 	KTUppy.init();
// });
