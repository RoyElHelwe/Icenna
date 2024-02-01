import { Button, Card, Container, Grid, Modal, Stack, Typography } from '@mui/material'
import Head from 'next/head'
import React, { use, useState } from 'react'
import LandingLayout from 'src/layouts/LandingLayout'
import Faqs from 'src/components/faqs'
import Contact from 'src/components/contact'
import { useTranslation } from 'react-i18next'

const Price = () => {
    const data = [
        {
            type: '5 users',
            price: 'Free',
            text: 'Up to 5 users',
            list: [
                'NPHIES Connect',
                'Healthcare Administration',
                'Booking Appointment',
                'Customer Service',
                'Medical Record Management',
                'Finance and Accounting',
                'Stock and inventory Management',
                'Training',
                '24/7 support'
            ]
        },
        {
            type: '6 users +',
            price: 'SAR 199',
            month: 'user/month',
            text: '6 users and more',
            list: [
                'NPHIES Connect',
                'Healthcare Administration',
                'Booking Appointment',
                'Customer Service',
                'Medical Record Management',
                'Finance and Accounting',
                'Stock and inventory Management',
                'Training',
                '24/7 support'
            ]
        },
        {
            type: 'Enterprise',
            price: 'Contact us',
            text: 'For an enterprise solution:',
            contact: [
                'Please contact us:',
                'Sales@iCenna.com',
            ]
        },
    ]
    const data2 = [
        {
            title: "NPHIES Connect",
            list: [
                {
                    title: "Eligibility check",
                    free: "Ready",
                    premium: "Ready",
                    enterprise: ""
                },
                {
                    title: "Beneficiary details",
                    free: "Ready",
                    premium: "Ready",
                    enterprise: ""
                },
                {
                    title: "Approval/preauthorization",
                    free: "Ready",
                    premium: "Ready",
                    enterprise: ""
                },
                {
                    title: "Claims Management",
                    free: "Ready",
                    premium: "Ready",
                    enterprise: ""
                },
                {
                    title: "Payment notice and reconciliation",
                    free: "Ready",
                    premium: "Ready",
                    enterprise: ""
                }
            ]
        },
        {
            title: 'Healthcare Management',
            list: [
                {
                    title: "Manage the company profile",
                    free: "Unlimited",
                    premium: "Unlimited",
                    enterprise: "",
                },
                {
                    title: "Manage the services, including consultation",
                    free: "Unlimited",
                    premium: "Unlimited",
                    enterprise: "",
                },
                {
                    title: "Manage the shift plan",
                    free: "Unlimited",
                    premium: "Unlimited",
                    enterprise: "",
                },
                {
                    title: "Configure price, package and offers",
                    free: "Unlimited",
                    premium: "Unlimited",
                    enterprise: "",
                },
                {
                    title: "Manage doctor and user profile",
                    free: "",
                    premium: "",
                    enterprise: "",
                },
                {
                    title: "Manage Psychiatry, Dental, Ophthalmology,and Family Medicine department",
                    free: "Unlimited",
                    premium: "Unlimited",
                    enterprise: "",
                },
                {
                    title: "Vision/Optical Solution",
                    free: "Unlimited",
                    premium: "Unlimited",
                    enterprise: "",
                }
            ]
        },
        {
            title: 'Booking System Management',
            list: [
                {
                    title: "Accept Insurance and Cash patient",
                    free: "Unlimited",
                    premium: "Unlimited",
                    enterprise: "",
                },
                {
                    title: "Elagability check builtin ",
                    free: "Ready",
                    premium: "Ready",
                    enterprise: "",
                },
                {
                    title: "Accept MasterCard/Mada and cash",
                    free: "Ready",
                    premium: "Ready",
                    enterprise: "",
                },
                {
                    title: "Accept STCPay and ApplePay",
                    free: "Ready",
                    premium: "Ready",
                    enterprise: "",
                },
                {
                    title: "Mobile App ready",
                    free: "iOS and Android",
                    premium: "iOS and Android",
                    enterprise: "",
                }
            ]
        },
        {
            title: 'Medical Record Management',
            list: [
                {
                    title: "Comply with all Saudi Healthcare Standard from CHI, nphies and NHC",
                    free: "Ready",
                    premium: "Ready",
                    enterprise: "",
                },
                {
                    title: "Saudi Healthcare Standard",
                    free: "Ready",
                    premium: "Ready",
                    enterprise: "",
                },
                {
                    title: "NPHIES and CHI Integration",
                    free: "Ready",
                    premium: "Ready",
                    enterprise: "",
                },
                {
                    title: "Absher/Yaqeen Integration",
                    free: "Ready",
                    premium: "Ready",
                    enterprise: "",
                },
                {
                    title: "Patient Encounter",
                    free: "Unlimited",
                    premium: "Unlimited",
                    enterprise: "",
                },
                {
                    title: "Medical Record History",
                    free: "Unlimited",
                    premium: "Unlimited",
                    enterprise: "",
                },
            ],
        },
        {
            title: 'Accounting',
            list: [
                {
                    title: "GL, AP, AR and Invoices",
                    free: "Unlimited",
                    premium: "Unlimited",
                    enterprise: "",
                },
                {
                    title: "ZACTA and Saudi VAT Ready",
                    free: "Ready",
                    premium: "Ready",
                    enterprise: "",
                },
            ]
        }
    ]
    const [type, setType] = useState('free')
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { t } = useTranslation();
    return (
        <>
            <Head>
                <title>An AI Healthcare Product</title>
                <meta name="description" content="iCenna is an Artificial Intelligence and Machine learning healthcare product built for Healthcare providers and patients to connect them into one platform, using a sophisticated algorithm" key="desc" />
                <meta property="og:title" content="An AI Healthcare Product" />
                <meta
                    property="og:description"
                    content="iCenna is an Artificial Intelligence and Machine learning healthcare product built for Healthcare providers and patients to connect them into one platform, using a sophisticated algorithm"
                />
                <meta
                    property="og:image"
                    content="/assets/logo/png-01.png"
                />
            </Head>
            <Container maxWidth="lg" sx={{ pt: "72px" }}>
                <Typography variant="h1" sx={{ textAlign: 'center', fontSize: { xs: '2.25rem', md: '4.5rem', }, fontWeight: 'bold', }}>
                    {t("Pricing Plans")}
                </Typography>
                <Stack spacing={{ xs: '24px' }} direction={{ xs: 'column', md: 'row' }} justifyContent={"space-between"} sx={{ width: '100%', border: '1px', pt: { md: '72px', xs: '50px' } }} >
                    {data.map((item, index) => (
                        <Card key={index} spacing={"48px"} sx={{ p: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '48px', width: { md: '360px', xs: '100%' } }}>
                            <Stack spacing={"50px"}>
                                <Stack spacing={'20px'}>
                                    <Typography variant="h6" sx={{ fontSize: { xs: '18px', md: '18px', }, fontWeight: 'bold', }}>
                                        {t(item.type)}
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontSize: { xs: '48px', md: '48px', }, fontWeight: 'bold', }}>
                                        {t(item.price)} <Typography variant="span" sx={{ textAlign: 'center', fontSize: { xs: '10px', md: '12px', }, fontWeight: 'normal', display: 'inline' }}> {t(item?.month)}</Typography>
                                    </Typography>
                                </Stack>
                                <Stack spacing={"25px"}>
                                    <Typography variant="h6" sx={{ fontSize: { xs: '14px', md: '14px', }, fontWeight: '500', }}>
                                        {t(item.text)}
                                    </Typography>
                                    <Stack spacing={"12px"}>
                                        {item?.list?.map((list, index) => (
                                            <Stack spacing={2} direction={"row"} key={index}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M9.00016 16.1701L4.83016 12.0001L3.41016 13.4101L9.00016 19.0001L21.0002 7.00009L19.5902 5.59009L9.00016 16.1701Z" fill="#006D31" />
                                                </svg>
                                                <Typography variant="h6" sx={{ fontSize: { xs: '14px', md: '16px', }, fontWeight: '400', }}>
                                                    {t(list)}
                                                </Typography>
                                            </Stack>
                                        ))}
                                        {item?.contact?.map((list, index) => (
                                            <Stack spacing={2} direction={"row"} key={index}>
                                                <Typography variant="h6" sx={{ fontSize: { xs: '14px', md: '16px', }, fontWeight: '400', }}>
                                                    {t(list)}
                                                </Typography>
                                            </Stack>
                                        ))}
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Button variant='contained' color='primary' sx={{
                                backgroundColor: 'white',
                                color: 'black',
                                //  onHover
                                '&:hover': {
                                    color: 'white',
                                },
                            }}
                                onClick={handleOpen}
                            >
                                {t("Contact Us")}
                            </Button>
                        </Card>
                    ))}
                </Stack>
            </Container>
            <Container maxWidth="lg" sx={{ pt: "72px", display: { xs: 'none', md: 'block' } }}>
                <Grid container spacing={1}>
                    <Grid container item spacing={3}>
                        <Grid item xs={6} borderRight={1} borderBottom={1} borderColor={'#D8D8D8'}>
                            <Typography variant="h6" sx={{ fontSize: { xs: '14px', md: '24px', }, fontWeight: '700', paddingBottom: '20px' }}>
                                {t("Plan comparison")}
                            </Typography>
                        </Grid>
                        <Grid item xs={2} borderRight={1} borderBottom={1} borderColor={'#D8D8D8'}>
                            <Typography variant="h6" sx={{ fontSize: { xs: '14px', md: '16px', }, fontWeight: '700', paddingBottom: '20px' }}>
                                {t("5 users")}
                            </Typography>
                            <Typography variant="h6" sx={{ fontSize: { xs: '14px', md: '20px', }, fontWeight: '600', paddingBottom: '20px' }}>
                                {t("SAR")} 0
                            </Typography>
                        </Grid>
                        <Grid item xs={2} borderRight={1} borderBottom={1} borderColor={'#D8D8D8'}>
                            <Typography variant="h6" sx={{ fontSize: { xs: '14px', md: '16px', }, fontWeight: '700', paddingBottom: '20px' }}>
                                {t("6+ Users")}
                            </Typography>
                            <Typography variant="h6" sx={{ fontSize: { xs: '14px', md: '20px', }, fontWeight: '600', paddingBottom: '20px' }}>
                                {t("SAR")} 199
                            </Typography>
                        </Grid>
                        <Grid item xs={2} borderRight={1} borderBottom={1} borderColor={'#D8D8D8'}>
                            <Typography variant="h6" sx={{ fontSize: { xs: '14px', md: '16px', }, fontWeight: '700', paddingBottom: '20px' }}>
                                {t("Enterprise Solution")}
                            </Typography>
                            <Typography variant="h6" sx={{ fontSize: { xs: '14px', md: '16px', }, fontWeight: '600', paddingBottom: '20px' }}>
                                {t("Contact us")}&nbsp;
                                sales@iCenna.com
                            </Typography>
                        </Grid>
                    </Grid>
                    {
                        data2.map((item, index) => (
                            <>
                                <Grid container item spacing={3}>
                                    <Grid item xs={6} borderRight={1} borderColor={'#D8D8D8'}>
                                        <Typography variant="h6" sx={{ fontSize: { xs: '18px', md: '24px', }, fontWeight: 'bold', paddingBottom: '30px' }}>
                                            {t(item.title)}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2} borderRight={1} borderColor={'#D8D8D8'} sx={{ paddingBottom: '30px' }}>

                                    </Grid>
                                    <Grid item xs={2} borderRight={1} borderColor={'#D8D8D8'} sx={{ paddingBottom: '30px' }}>

                                    </Grid>
                                    <Grid item xs={2} borderRight={1} borderColor={'#D8D8D8'} sx={{ paddingBottom: '30px' }}>

                                    </Grid>
                                </Grid>
                                {item.list.map((list, index) => (
                                    <Grid container item spacing={3}>
                                        <Grid item xs={6} borderRight={1} borderColor={'#D8D8D8'}>
                                            <Typography variant="h6" sx={{ fontSize: { xs: '14px', md: '16px', }, fontWeight: '400', paddingBottom: '20px' }}>
                                                {t(list.title)}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2} borderRight={1} borderColor={'#D8D8D8'}>
                                            <Typography variant="h6" sx={{ fontSize: { xs: '14px', md: '16px', }, fontWeight: '400', paddingBottom: '20px' }}>
                                                {list.free == "true" ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M9.00016 16.1701L4.83016 12.0001L3.41016 13.4101L9.00016 19.0001L21.0002 7.00009L19.5902 5.59009L9.00016 16.1701Z" fill="#006D31" />
                                                </svg> : t(list.free)}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2} borderRight={1} borderColor={'#D8D8D8'}>
                                            <Typography variant="h6" sx={{ fontSize: { xs: '14px', md: '16px', }, fontWeight: '400', paddingBottom: '20px' }}>
                                                {list.premium == "true" ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M9.00016 16.1701L4.83016 12.0001L3.41016 13.4101L9.00016 19.0001L21.0002 7.00009L19.5902 5.59009L9.00016 16.1701Z" fill="#006D31" />
                                                </svg> : t(list.premium)}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2} borderRight={1} borderColor={'#D8D8D8'}>
                                            <Typography variant="h6" sx={{ fontSize: { xs: '14px', md: '16px', }, fontWeight: '400', paddingBottom: '20px' }}>
                                                {list.enterprise == "true" ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M9.00016 16.1701L4.83016 12.0001L3.41016 13.4101L9.00016 19.0001L21.0002 7.00009L19.5902 5.59009L9.00016 16.1701Z" fill="#006D31" />
                                                </svg> : t(list.enterprise)}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                ))}
                            </>
                        ))
                    }
                </Grid>
            </Container>
            <Container sx={{ pt: "72px", display: { xs: 'block', md: 'none' } }}>
                <Stack direction={"row"} justifyContent={"space-between"}>
                    <Button
                        onClick={() => setType('free')}
                        variant='contained'
                        sx={{ textWrap: 'nowrap', backgroundColor: type === 'free' ? 'blue' : 'initial', color: type === 'free' ? 'white' : 'black' }}
                    >
                        {t("SAR")} 0
                    </Button>
                    <Button
                        onClick={() => setType('6')}
                        variant='contained'
                        sx={{ textWrap: 'nowrap', backgroundColor: type === '6' ? 'blue' : 'initial', color: type === '6' ? 'white' : 'black' }}
                    >
                        {t("6 users +")}
                    </Button>
                    <Button
                        onClick={() => setType('enterprise')}
                        variant='contained'
                        sx={{ textWrap: 'nowrap', backgroundColor: type === 'enterprise' ? 'blue' : 'initial', color: type === 'enterprise' ? 'white' : 'black' }}
                    >
                        {t("Enterprise")}
                    </Button>
                </Stack>
                <Grid container spacing={1} sx={{ pt: '60px' }}>
                    {
                        data2.map((item, index) => (
                            <>
                                <Grid container item spacing={3}>
                                    <Grid item xs={12} >
                                        <Typography variant="h6" sx={{ fontSize: { xs: '18px', md: '24px', }, fontWeight: 'bold', paddingBottom: '30px' }}>
                                            {t(item.title)}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                {item.list.map((list, index) => (
                                    <Grid container item justifyContent={"space-between"}>
                                        <Grid item xs={6}>
                                            <Typography variant="h6" sx={{ fontSize: { xs: '14px', md: '16px', }, fontWeight: '400', paddingBottom: '20px' }}>
                                                {t(list.title)}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} sx={{ justifyContent: 'flex-end', display: 'flex' }} >
                                            <Typography variant="h6" sx={{ fontSize: { xs: '14px', md: '16px', }, fontWeight: '400', paddingBottom: '20px' }}>
                                                {
                                                    type == 'free' ? list.free == "true" ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M9.00016 16.1701L4.83016 12.0001L3.41016 13.4101L9.00016 19.0001L21.0002 7.00009L19.5902 5.59009L9.00016 16.1701Z" fill="#006D31" />
                                                    </svg> : t(list.free)
                                                        : type == '6' ? list.premium == "true" ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M9.00016 16.1701L4.83016 12.0001L3.41016 13.4101L9.00016 19.0001L21.0002 7.00009L19.5902 5.59009L9.00016 16.1701Z" fill="#006D31" />
                                                        </svg> : t(list.premium)
                                                            : list.enterprise == "true" ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M9.00016 16.1701L4.83016 12.0001L3.41016 13.4101L9.00016 19.0001L21.0002 7.00009L19.5902 5.59009L9.00016 16.1701Z" fill="#006D31" />
                                                            </svg> : t(list.enterprise)
                                                }
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                ))}
                            </>
                        ))
                    }
                </Grid>
            </Container>
            <Faqs />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Contact handleClose={handleClose} />
            </Modal>
        </>
    )
}

Price.getLayout = (page) => {
    return (
        <LandingLayout>
            {page}
        </LandingLayout>
    )
}
Price.authGuard = false;

export default Price
