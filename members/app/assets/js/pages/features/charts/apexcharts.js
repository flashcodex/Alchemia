"use strict";

// Shared Colors Definition
const primary = '#6993FF';
const success = '#1BC5BD';
const info = '#8950FC';
const warning = '#FFA800';
const danger = '#F64E60';

// Class definition
function generateBubbleData(baseval, count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;;
      var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;
  
      series.push([x, y, z]);
      baseval += 86400000;
      i++;
    }
    return series;
  }

function generateData(count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
        var x = 'w' + (i + 1).toString();
        var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

        series.push({
            x: x,
            y: y
        });
        i++;
    }
    return series;
}
function numberWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


var KTApexChartsDemo = function () {
	// Private functions
	var _demo5 = function (chart, option, year, month) {

		let element = document.getElementById("chart5");
        let gensales = [];
        let months = [];
        let textni='';
        let range=0;
        if (!element) {
            return;
        }
       $.ajax({
            url: "controller/controller.php",
            type: "post",
            data:{
                  action: btoa("fetch_chart_options"),
                  type: chart,
                  option : option,
                  year : year,
                  month : month
                  },
            dataType: "json",
            beforeSend: function(){
            // KTApp.blockPage();
            },
            complete: function(){
			$('#chart5').empty();
		         let options = {
		             	series: [{
						name: 'Amount',
						data: gensales,
					   }
					],
					chart: {
					            type: 'bar',
					            height: 350,
					            toolbar: {
					                show: false
					              }
					            },
					            plotOptions: {

					            },
					            legend: {
					                show: false
					            },
					            dataLabels: {
					                enabled: false
					            },
					            fill: {
					                type: 'solid',
					                opacity: 1
					            },
					            stroke: {
					                curve: 'smooth',
					                show: true,
					                width: 3,
					                colors: [KTApp.getSettings()['colors']['theme']['base']['info']]
					            },
					            xaxis: {
					                categories: months,
					                axisBorder: {
					                    show: false,
					                },
					                axisTicks: {
					                    show: false
					                },
					                labels: {
					                    style: {
					                        colors: KTApp.getSettings()['colors']['gray']['gray-500'],
					                        fontSize: '12px',
					                        fontFamily: KTApp.getSettings()['font-family']
					                    },

					                },
					                crosshairs: {
					                    position: 'front',
					                    stroke: {
					                        color: KTApp.getSettings()['colors']['theme']['base']['info'],
					                        width: 1,
					                        dashArray: 3
					                    }
					                },
					                tooltip: {
					                    enabled: true,
					                    formatter: undefined,
					                    offsetY: 0,
					                    style: {
					                        fontSize: '12px',
					                        fontFamily: KTApp.getSettings()['font-family']
					                    }
					                }
					            },
					            yaxis: {
					                labels: {
					                    style: {
					                        colors: KTApp.getSettings()['colors']['gray']['gray-500'],
					                        fontSize: '12px',
					                        fontFamily: KTApp.getSettings()['font-family']
					                    },
						                  formatter: function(val) {
						                  	let n = numberWithCommas(val);
									        return n;
									      }
					                }
					            },

					            tooltip: {
					                style: {
					                    fontSize: '12px',
					                    fontFamily: KTApp.getSettings()['font-family']
					                },
					                y: {
					                    formatter: function (val) {
					                    	let n = numberWithCommas(val);
					                        return "P" + n + " thousands"
					                    }
					                }
					            },
					            colors: [KTApp.getSettings()['colors']['theme']['light']['info']],
					            grid: {
					                borderColor: KTApp.getSettings()['colors']['gray']['gray-200'],
					                strokeDashArray: 4,
					                yaxis: {
					                    lines: {
					                        show: true
					                    }
					                }
					            },
					            markers: {
					                strokeColor: KTApp.getSettings()['colors']['theme']['base']['info'],
					                strokeWidth: 3
					            }	
			            }
						    let chart = new ApexCharts(element, options);
					        chart.render();
			      	},
      			success:function(response)
      			{
      				
		                if(response != false){
		                  if(response.length >= 1){
		                     for(var i = 0; response.length > i; i++){
								gensales.push(Number(response[i].gensales));
		                        if(option == "MONTH"){
		                           months.push(response[i].label_month.substring(0, 3));
		                           var data_status = response[i].year;
		                        }else if(option == "WEEK"){
		                           months.push('Week '+response[i].option+' of '+response[i].label_month.substring(0, 3));
		                           var data_status = response[i].year;
		                        }else if(option == "DAY"){
		                           months.push('Day '+response[i].option+' of '+response[i].label_month.substring(0, 3));
		                           var data_status = response[i].year+'-'+response[i].label_month;
		                        }   
		                        $('.title-year').text('('+data_status+')');
		                     }
		                  }else{
		                    const Toast = Swal.mixin({
		                            toast: true,
		                            position: 'top-end',
		                            showConfirmButton: false,
		                            timer: 3000,
		                            timerProgressBar: true,
		                            onOpen: (toast) => {
		                              toast.addEventListener('mouseenter', Swal.stopTimer)
		                              toast.addEventListener('mouseleave', Swal.resumeTimer)
		                            }
		                          })
		                          Toast.fire({
		                            icon: 'info',
		                            title: 'Cant load sales chart!'
		                          })
		                  }
		                }else{
		                     // const Toast = Swal.mixin({
		                     //        toast: true,
		                     //        position: 'top-end',
		                     //        showConfirmButton: false,
		                     //        timer: 3000,
		                     //        timerProgressBar: true,
		                     //        onOpen: (toast) => {
		                     //          toast.addEventListener('mouseenter', Swal.stopTimer)
		                     //          toast.addEventListener('mouseleave', Swal.resumeTimer)
		                     //        }
		                     //      })
		                     //      Toast.fire({
		                     //        icon: 'info',
		                     //        title: 'Cant load sales chart!'
		                     //      }) 
		                } 

              }   


      });
	}

var _demo6 = function (chart, option, year, month) {

		let element = document.getElementById("chart6");
        let count_confirmed = [];
        let count_delivered = [];
        let months = [];
        let textni='';
        let range=0;
        if (!element) {
            return;
        }
					  $.ajax({
			            url: "controller/controller.php",
			            type: "post",
			            data:{
			                  action: btoa("fetch_chart_options"),
			                  type: chart,
			                  option : option,
			                  year : year,
			                  month : month
			                  },
			            dataType: "json",
			            beforeSend: function(){
			            // KTApp.blockPage();
			            },
			            complete: function(){
						$('#chart6').empty();
					var options = {
						series: [{
							name: 'Confirmed',
							type: 'column',
							data: count_confirmed,
						}, {
							name: 'Delivered',
							type: 'column',
							data: count_delivered
						}
						],
						chart: {
							height: 350,
							type: 'line',
							stacked: false
						},
						dataLabels: {
							enabled: false
						},
						stroke: {
							width: [1, 1, 4]
						},
						xaxis: {
							categories: months,
						},
						yaxis: [
							{
								axisTicks: {
									show: true,
								},
								axisBorder: {
									show: true,
									color: info
								},
								labels: {
									style: {
										colors: info,
									},
									formatter: function(val) {
								        return val.toFixed(0);
								      }
								},
								title: {
									text: "Confirmed  Orders",
									style: {
										color: info,
									}
								},
								tooltip: {
									enabled: true
								}
							},
							{
								seriesName: 'Income',
								opposite: true,
								axisTicks: {
									show: true,
								},
								axisBorder: {
									show: true,
									color: success
								},
								labels: {
									style: {
										colors: success,
									},
									 formatter: function(val) {
								        return val.toFixed(0);
								      }
								},
								title: {
									text: "Delivered Orders",
									style: {
										color: success,
									}
								},
							},
						],
						tooltip: {
							fixed: {
								enabled: true,
								position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
								offsetY: 30,
								offsetX: 60
							},
						},
						legend: {
							horizontalAlign: 'left',
							offsetX: 40
						},
						colors: [info,success]
					};
						     let chart = new ApexCharts(element, options);
					        chart.render();
			      	},
      			success:function(response)
      			{			
			                if(response != false){
			                  if(response.length >= 1){
			                     for(var i = 0; response.length > i; i++){
									count_confirmed.push(Number(response[i].confirmed));
									count_delivered.push(Number(response[i].delivered));
			                        if(option == "MONTH"){
			                           months.push(response[i].label_month.substring(0, 3));
			                           var data_status = response[i].year;
			                        }else if(option == "WEEK"){
			                           months.push('Week '+response[i].option+' of '+response[i].label_month.substring(0, 3));
			                           var data_status = response[i].year;
			                        }else if(option == "DAY"){
			                           months.push('Day '+response[i].option+' of '+response[i].label_month.substring(0, 3));
			                           var data_status = response[i].year+'-'+response[i].label_month;
			                        }   
			                        $('.title-years').text('('+data_status+')');
			                     }
			                  }else{
			                    // const Toast = Swal.mixin({
			                    //         toast: true,
			                    //         position: 'top-end',
			                    //         showConfirmButton: false,
			                    //         timer: 3000,
			                    //         timerProgressBar: true,
			                    //         onOpen: (toast) => {
			                    //           toast.addEventListener('mouseenter', Swal.stopTimer)
			                    //           toast.addEventListener('mouseleave', Swal.resumeTimer)
			                    //         }
			                    //       })
			                    //       Toast.fire({
			                    //         icon: 'info',
			                    //         title: 'Cant load sales chart!'
			                    //       })
			                  }
			                }
	              }   


	      });	
	}


	return {
		// public functions
		init: function (chart, option, year, month) {
			if(chart=='chart5'){
			_demo5(chart, option, year, month);
			}else if(chart=='chart6'){
			_demo6(chart, option, year, month);
			}
		}
	};
}();

// jQuery(document).ready(function () {
// 	KTApexChartsDemo.init();
// });
