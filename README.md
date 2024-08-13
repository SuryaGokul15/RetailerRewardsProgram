# RetailerRewardsProgram
A retailer offers a rewards program to its customers, awarding points based on each recorded purchase.

steps to see the Reward Details:
 
userDetails:[C001,C002,C003,C004]
 
1.kindly login using above mentioned CustomerID.
2.once loggedin user can see the Total Rewards with their latest three month indivial rewards points along with customer Transaction Details.
3.if user entered wrong credential, user can see the message in the UI "Customer not Registered yet. kindly contact Admin and check again"
 
->->totally 3 components are used userForm,rewardPage,userTable
 
->->userForm: This is a login page user have to provide cutomerId and once user submit the form It will redirect to rewardDetails page.
->variables: 
	->value: storing the customerId 
-> used useNavigate to navigate from home page to rewardDetails

->->rewardPage: this page is used for calculating rewardpoints, filtering each customer details from total transactions, filtering latest 3 months reward Points and providing the UI details of Total Rewards and latest 3 months Rewards details.
->variables:
        ->custId: this is a Object storing customerId which is accessing from useParams
	->transactionData: this is a state storing all TransactionDetails
	->loading: this is a state, initially it is set to be true once fetched the data setting as a false.
	->rewards: this is a state, storing all rewardsPercustomer Details
	->error: this is also a state, storing error Details while fetching data
	->columns: array of Objects, storing id and label of the customerDetails used for header of the table.
 
->functions:
	->fetchCustTransaction: using promise  to handle asynchronous code and fetching the customerDetails.
	->calculatePoints: used to calculate reward points based on the amount.
	->filteredTransactions: using filter function filtering the particular customerTransaction details basedon the customerId.
	->filteredRewards: using map, reduce and filter getting latest 3 months individual RewardDetails.
	->filteredMonthlyPoints: filter function is used to filter the monthly reward data based on a conditions and along with reduce function is used to transform the filtered           monthly reward data into a new object, so finally it will give latest 3 months individual reward details.
	->filterTotalValue:  based on filteredMonthlyPoints and using reduce function calculating latest 3 months total reward points.
	->outer reduce function is used to transform the array of customer objects into a new object.
	->getTransactions: using async and await calling fetchCustTransaction updating the transactionData and loading details while initial render.
	->getMonthName: used to convert monthNumber to monthName.
	->calculateRewards: traversing filteredTransactions to get customerTransactin Details and using calculatePoints calculating the rewards points. creating rewardsPerCustomer         as empty object, if its empty then adding two variables total and monthly, if montly object empty creating montly object variables and if its present adding total            points and individual month points. used this in useEffect it will render once transactinData changes.
	-> calling userTable and passing columns and filteredTransactions.
 
->->userTable: it used to show table structure of customerTransactionDetails.
