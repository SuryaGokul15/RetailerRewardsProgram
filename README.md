# RetailerRewardsProgram
A retailer offers a rewards program to its customers, awarding points based on each recorded purchase.

steps to see the Reward Details:
 
userDetails:[C001,C002,C003,C004]
 
1.kindly login using above mentioned CustomerID.<br>
2.once loggedin user can see the Total Rewards with their latest three month indivial rewards points along with customer Transaction Details.<br>
3.if user entered wrong credential, user can see the message in the UI "Customer not Registered yet. kindly contact Admin and check again"<br>
 
->->totally 3 components are used userForm,rewardPage,userTable<br>
 
->->userForm: This is a login page user have to provide cutomerId and once user submit the form It will redirect to rewardDetails page.<br>
->variables: <br>
	->value: storing the customerId <br>
-> used useNavigate to navigate from home page to rewardDetails<br>

->->rewardPage: this page is used for calculating rewardpoints, filtering each customer details from total transactions, filtering latest 3 months reward Points and providing the UI details of Total Rewards and latest 3 months Rewards details.<br>
->functions:<br>
	->fetchCustTransaction: using promise  to handle asynchronous code and fetching the customerDetails.<br>
	->calculatePoints: used to calculate reward points based on the amount.<br>
	->filteredTransactions: using filter function filtering the particular customerTransaction details basedon the customerId.<br>
	->filteredRewards: using map, reduce and filter getting latest 3 months individual RewardDetails.<br>
	->filteredMonthlyPoints: filter function is used to filter the monthly reward data based on a conditions and along with reduce function is used to transform the 	     filtered monthly reward data into a new object, so finally it will give latest 3 months individual reward details.<br>
	->filterTotalValue:  based on filteredMonthlyPoints and using reduce function calculating latest 3 months total reward points.<br>
	->outer reduce function is used to transform the array of customer objects into a new object.<br>
	->getTransactions: using async and await calling fetchCustTransaction updating the transactionData and loading details while initial render.<br>
	->getMonthName: used to convert monthNumber to monthName.<br>
	->calculateRewards: traversing filteredTransactions to get customerTransactin Details and using calculatePoints calculating the rewards points. creating 		     rewardsPerCustomer as empty object, if its empty then adding two variables total and monthly, if montly object empty creating montly object variables and if its 
             present adding total points and individual month points. used this in useEffect it will render once transactinData changes.<br>
	-> calling userTable and passing columns and filteredTransactions.<br>
 
->->userTable: it used to show table structure of customerTransactionDetails.<br>
->->App: using router routing the path from homepage to rewardDetails.


Results:

HomePage:<br>
<img width="949" alt="image" src="https://github.com/user-attachments/assets/a593a342-cfc8-4549-b581-a61501b9410d"><br>

RewardDetailsPage:<br>
<img width="960" alt="image" src="https://github.com/user-attachments/assets/3ab58130-8277-46a4-b1ac-cfd8e7aadc39">

if user given wrong credentials:<br>
<img width="958" alt="image" src="https://github.com/user-attachments/assets/446716d0-4606-4f11-b01c-b54b42c3de58">



