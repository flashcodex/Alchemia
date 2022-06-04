 <?php 
	 
   // @session_start();
   // if(!isset($_SESSION['SESS_AdSTATUS'],$_SESSION['SESS_TYPE']) && $_SESSION['SESS_AdSTATUS'] != md5('active')
   //    && $_SESSION['SESS_TYPE'] != md5('admin')) {
   //      header('Location: https://thebailiwick.academy/admin1012020/login/');
   //      exit();
   // }else{

   // }



	require "../model/charts.php";
	
	$charts = new Charts();
	
	if(isset($_POST['action']))
	{
		$action = $_POST['action'];
		if($action === "fetch_chart_options")
		{   
			$data=array();
			$selected = (isset($_POST['data1'])) ? $_POST['data1'] : 'undefined';
			$option = (isset($_POST['data2'])) ? $_POST['data2'] : 'undefined';
			$model_response = json_encode($charts->Fetch_Options($selected, $option));
			if($model_response != false){
		           $data = array(
		                'type' => 'success',
		                'message' => 'request accepted',
		                'data' => base64_encode($model_response)
		           );
			}else{
	               $data = array(
		               'type' => 'error',
		               'message' => 'Something went wrong, Try again later..',
		               'data' => base64_encode($model_response)
		           );
			}
			echo json_encode($data);

		}else if($action === "fetch_chart"){   
            $selected = $_POST['selected'];
            $option = $_POST['option'];
            $year = $_POST['year'];
            $month = $_POST['month'];
	 	  	echo json_encode($charts->Fetch_Chart($selected, $option, $year, $month));

		}else if($action === "top_classes"){   
            $view = $_POST['view'];
	 	  	echo json_encode($charts->Fetch_Top_Classes($view));
		}else if($action === "top_instructor"){   
            $view = $_POST['view'];
	 	  	echo json_encode($charts->Fetch_Top_Instructor($view));
		}else if($action === "top_students"){   
            $view = $_POST['view'];
	 	  	echo json_encode($charts->Fetch_Top_Students($view));
		}else if($action === "fetch_year_month_aff"){
	 	  	echo json_encode($charts->Fetch_Year_Month_Aff());
		}else if($action === "top_affiliate"){   
            $view = $_POST['view'];
	 	  	echo json_encode($charts->Fetch_Top_Affiliate($view));
		}else if($action === "update_leaderboard"){
	 	  	echo json_encode($charts->Update_Leaderboard());
		}else if($action === "update_affiliate_leaderboard"){
	 	  	echo json_encode($charts->Update_Affiliate_Leaderboard());
		}else if($action === "update_ledger_wallet_in"){
	 	  	echo json_encode($charts->Update_Ledger_Wallet_In());
		}else if($action === "update_ledger_wallet_out"){
	 	  	echo json_encode($charts->Update_Ledger_Wallet_Out());
		}else if($action === "get_entries"){
	 	  	echo json_encode($charts->Get_Entries());
		}else if($action === "fetch_account"){
			$account = $_POST['account'];
	 	  	echo json_encode($charts->Fetch_Account($account));
		}else if($action === "fetch_payout"){
			$account = $_POST['account'];
	 	  	echo json_encode($charts->Fetch_Payout($account));
		}else if($action === "fetch_details"){
			$ids = $_POST['id'];
			$account = $_POST['account'];
	 	  	echo json_encode($charts->Fetch_Details($ids, $account));
		}else if($action === "fetch_payout_details"){
			$from = $_POST['from'];
			$to = $_POST['to'];
			$account = $_POST['account'];
	 	  	echo json_encode($charts->Fetch_Payout_Details($from, $to, $account));
		}else if($action === "submit_payout"){
			$from = $_POST['from'];
			$to = $_POST['to'];
			$account = $_POST['account'];
			$ref_no = $_POST['ref_no'];
			$txn_no = $_POST['txn_num'];
			$wht = $_POST['user_wht'];
			$payout_type = $_POST['payout_type'];

	 	  	echo json_encode($charts->Submit_Payout($from, $to, $account, $ref_no, $txn_no, $wht, $payout_type));
	 	  	
		}else if($action === "fetch_payout_history"){
			$account = $_POST['account'];
	 	  	echo json_encode($charts->Fetch_Payout_History($account));
		}else if($action === "fetch_periods"){
			$limit = $_POST['limit'];
	 	  	echo json_encode($charts->Fetch_Periods($limit));
		}else if($action === "fetch_period_entries"){
			$from = $_POST['from'];
			$to = $_POST['to'];
	 	  	echo json_encode($charts->Fetch_Period_Entries($from, $to));
		}else if($action === "get_period"){
			$from = $_POST['from'];
			$to = $_POST['to'];
	 	  	echo json_encode($charts->Get_Period($from, $to));
		}else if($action === "get_courses"){
	 	  	echo json_encode($charts->Get_Courses());
		}else if($action === "get_details_status"){
	 	  	echo json_encode($charts->Get_Details_Status());
		}else if($action === "get_student_status"){
	 	  	echo json_encode($charts->Get_Student_Status());
		}else if($action === "get_student_role"){
	 	  	echo json_encode($charts->Get_Student_Role());
		}else if($action === "initiate_dash"){
			$type = $_POST['type'];
	 	  	echo json_encode($charts->Initiate_Dash($type));
		}else if($action === "fetch_cart_details"){
			$id = $_POST['id'];
	 	  	echo json_encode($charts->Fetch_Cart_Details($id));
		}else if($action === "move_payouts"){
	 	  	echo json_encode($charts->Move_Payouts());
		}else if($action === "fetch_support_area"){
	 	  	echo json_encode($charts->Fetch_Support_Area());
		}else if($action === "fetch_support_entry"){
			$type = $_POST['type'];
			$data = $_POST['data'];
			$id = $_POST['id'];
	 	  	echo json_encode($charts->Fetch_Support_Entry($type, $data, $id));
		}
	}else{
		echo json_encode(false);
	}
	

?>