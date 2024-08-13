import { React, useState, useEffect } from 'react';
import { Paper, styled, Box, stack } from '@mui/material';
import logo from '../components/Images/Reward.jpg'
import customerData from '../data.json'
import { useParams } from 'react-router-dom';
import UserTable from './userTable';


const fetchCustTransaction = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(customerData);
        }, 1000);
    });
};

const calculatePoints = amount => {

    if (amount > 100) {

        return 2 * (amount - 100) + 50;

    } else if (amount > 50) {

        return amount - 50;

    }

    return 0;

};


function RewardPage() {

    const custId = useParams()
    const [transactionData, settransactionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [rewards, setRewards] = useState({});
    const [error, setError] = useState(null);
    const columns = [
        { id: 'CustomerID', label: 'CustomerID' },
        { id: 'CustomerName', label: 'CustomerName' },
        { id: 'TransactionAmount', label: 'TransactionAmount' },
        { id: 'TransactionDate', label: 'TransactionDate' }
    ]

    const filteredTransactions = transactionData?.filter(transaction => transaction.CustomerID == custId.id)

    const filteredRewards = Object.entries(rewards)
        .map(([customer, data]) => {
            const filteredMonthlyPoints = Object.entries(data.monthly)
                .filter(([month]) => {
                    const currentMonth = new Date().getMonth();
                    const monthDifference = currentMonth - parseInt(month);
                    return monthDifference >= 0 && monthDifference < 3;
                })
                .reduce((acc, [month, points]) => {
                    acc[month] = points;
                    return acc;
                }, {});
            const filterTotalValue = Object.entries(filteredMonthlyPoints)
                .reduce((acc, [month, points]) => {
                    acc.totalValue = (acc.totalValue || 0) + points
                    return acc;
                }, {})

            return {
                customer,
                total: filterTotalValue.totalValue,
                monthly: filteredMonthlyPoints
            };
        })
        .reduce((acc, { customer, total, monthly }) => {
            acc[customer] = { total, monthly };
            return acc;
        }, {});



    useEffect(() => {
        const getTransactions = async () => {
            try {
                const data = await fetchCustTransaction();
                settransactionData(data);
            }
            catch (err) {
                setError(err)
            }
            finally {
                setLoading(false)
            }

        };
        getTransactions();

    }, []);

    const getMonthName = (monthNumber) => {
        const date = new Date();
        date.setMonth(monthNumber);

        return date.toLocaleString('en-US', { month: 'long' });
    }


    useEffect(() => {

        const calculateRewards = () => {

            const rewardsPerCustomer = {};

            filteredTransactions.forEach(transaction => {
                const { CustomerID, TransactionAmount, TransactionDate } = transaction;

                const month = new Date(TransactionDate).getMonth();

                const points = calculatePoints(TransactionAmount);

                if (!rewardsPerCustomer[CustomerID]) {

                    rewardsPerCustomer[CustomerID] = { total: 0, monthly: {} };

                }


                if (!rewardsPerCustomer[CustomerID].monthly[month]) {

                    rewardsPerCustomer[CustomerID].monthly[month] = 0;

                }


                rewardsPerCustomer[CustomerID].total += points;

                rewardsPerCustomer[CustomerID].monthly[month] += points;
            });



            setRewards(rewardsPerCustomer);

        };




        if (filteredTransactions) {
            calculateRewards();
        }

    }, [transactionData]);

    return (

        <Paper elevation={3} sx={{ height: '500px', width: '1370px', ml: 2, mt: 10 }}>
            {loading ? (
                <div>Loading...</div>) :
                (filteredTransactions?.length ? (
                    <Box>
                        <h2 style={{ textAlign: 'center' }}>Reward Details-{custId.id}</h2>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: 'row'
                            }}
                        >
                            <img style={{ height: '200px', width: '200px' }} src={logo} />
                            <div className="reward-container">

                                {Object.entries(filteredRewards).map(([CustomerID, data]) => (

                                    <div key={CustomerID} className="customer-reward">
                                        <stack
                                            style={{
                                                margin: "20px",
                                                display: "flex",
                                                alignItems: "center",
                                                flexDirection: 'row'
                                            }}
                                        >
                                            <h3 style={{ color: "#1b5e20" }}>{data.total} </h3>
                                            <h4>&nbsp;Total Rewards</h4>
                                        </stack>
                                        <h4 style={{ margin: "20px" }} >Monthly Points:</h4>
                                        <div className="monthly-points" style={{
                                            display: "flex",
                                            alignItems: "center",
                                            flexDirection: 'row'
                                        }}>
                                            {Object.entries(data.monthly).map(([month, points]) => (
                                                <stack
                                                    style={{
                                                        margin: "20px",
                                                        padding: "10px 25px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        flexDirection: 'column',
                                                        backgroundColor: `#${(Math.floor(Math.random() * 16777215).toString(16))}`
                                                    }}>
                                                    <p style={{ color: "#FFFFFF" }} key={month}>{getMonthName(month)} Points</p>
                                                    <h4 style={{ color: "#FFFFFF" }}>{points}</h4>
                                                </stack>

                                            ))}

                                        </div>

                                    </div>

                                ))}
                            </div>
                            <UserTable columns={columns} data={filteredTransactions} />

                        </Box>
                    </Box>)
                    : <h3 style={{ color: "#ff0000", textAlign: "center", marginTop: "40px" }}>Customer not Registered yet. kindly Register and check again</h3>
                )}

        </Paper>

    )
}

export default RewardPage
