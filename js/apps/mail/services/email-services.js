import { utilService } from "../../../services/util-service.js"
import { storageService } from "../../../services/async-storage-service.js"

const EMAILS_KEY = 'emails'

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

var gEmails = null

export const emailService = {
    query,
    createMails,
    loadEmails,
    getEmailById,
    modifyEmail,
    countUnreadEmails,
    addEmail,
    deleteEmail,
    addToTrash,
    setAsRead,
}

function countUnreadEmails(criteria) {
    return query(criteria).then(emails => {
        var unreadEmails = 0
        emails.forEach(email => {
            if (email.isRead === false)
                unreadEmails++
        })
        return unreadEmails
    })
}

function modifyEmail(emailId, prop, val) {
    const foundEmail = gEmails.find(email => email.id === emailId)
    const emailIdx = gEmails.findIndex(email => email.id === emailId)

    var emailCopy = JSON.parse(JSON.stringify(foundEmail))
    emailCopy[prop] = val
    gEmails.splice(emailIdx, 1, emailCopy)
    utilService.saveToStorage(EMAILS_KEY, gEmails)
    return Promise.resolve(foundEmail)
}

function getEmailById(emailId) {
    const email = gEmails.find(email => email.id === emailId)
    return Promise.resolve(email)
}

function setAsRead(id) {
    return getEmailById(id).then(email=>{
        const emailIdx = gEmails.findIndex(email => email.id === id)
        var emailCopy = JSON.parse(JSON.stringify(email))
        emailCopy.isRead = !emailCopy.isRead
        gEmails.splice(emailIdx, 1, emailCopy)
        utilService.saveToStorage(EMAILS_KEY, gEmails)
    })
}

function addToTrash(emailId) {
    return modifyEmail(emailId, 'removedAt', new Date()).then(() => gEmails)
}

function query(criteria) {
    return storageService.query(EMAILS_KEY).then(emails => {
        // If sent emails, filter accordingly
        if (criteria.status === 'inbox') {
            emails = emails.filter(email => {
                return !email.removedAt && email.to === loggedinUser.email
            })
        } else if (criteria.status === 'sent') {
            emails = emails.filter(email => {
                return !email.removedAt && email.to !== loggedinUser.email
            })
        } else if (criteria.status === 'trash') {
            emails = emails.filter(email => {
                return email.removedAt
            })
        }

        // If filter by text
        if (criteria.txt) {
            emails = emails.filter(email => {
                return email.subject.toLowerCase().includes(criteria.txt.toLowerCase()) ||
                    email.from.toLowerCase().includes(criteria.txt.toLowerCase()) ||
                    email.body.toLowerCase().includes(criteria.txt.toLowerCase())
            })
        }

        // If filter by read status
        if (criteria.isRead) {
            emails = emails.filter(email => {
                if (criteria.isRead === 'all') return true
                return email.isRead.toString() === criteria.isRead
            })
        }

        // Sort by
        if (criteria.sortBy === "date") {
            emails = emails.sort((x, y) => {
                if (criteria.sortOrderAscending) return x.sentAt - y.sentAt
                return y.sentAt - x.sentAt
            })
        }

        return Promise.resolve(emails)
    })
}

createMails()
function createMails() {
    gEmails = utilService.loadFromStorage(EMAILS_KEY);
    if (!gEmails || !gEmails.length) {
        loadEmails()
        utilService.saveToStorage(EMAILS_KEY, gEmails);
    }
    return gEmails
}

function addEmail(newEmail) {
    newEmail.id = utilService.makeId()
    newEmail.isRead = true
    newEmail.sentAt = new Date()
    gEmails.push(newEmail)
    utilService.saveToStorage(EMAILS_KEY, gEmails)
    location.reload()
    return Promise.resolve(newEmail)
}

function deleteEmail(id) {
    var idx = gEmails.findIndex(email => email.id === id)
    gEmails.splice(idx, 1)
    utilService.saveToStorage(EMAILS_KEY, gEmails)
    
    return Promise.resolve(gEmails)
}

function loadEmails() {
    gEmails = [{
        from: 'Sessionize.com',
        fromEmail:'event@notifications.sessionize.com',
        id: 'e101',
        subject: 'Sessionize activation',
        body: `Classic account user@appsus.com on Sessionize is not activated.

Please Activate your Email Address.

If you haven't created an account, please contact us by replying to this message so we can delete it.
Thanks!`,
        isRead: true,
        sentAt: 1551143930594,
        to: 'user@appsus.com',
        removedAt: 1656745045000,
    }, {
        from: 'Me',
        fromEmail:'user@appsus.com',
        id: 'e126',
        subject: 'Question about sizing kit',
        body: `Hi there,

I ordered a new Oura ring for myself and also attached a sizing kit, so my husband can check his ring size and order one if mine works OK.
I know my US size is 6 and I ordered a 6 ring.

Is it OK? Should I do any other selection or is the order good for 6 size + free sizing kit?

Thanks a lot!`,
        isRead: true,
        sentAt: 1556633936594,
        to: 'orders@ouraring.com',
    }, {
        from: 'NordVPN',
        fromEmail:'support@nordvpn.com',
        id: 'e103',
        subject: 'We have received a request (ID #787254)',
        body: `Hello there,

Thank you for contacting us. A support ticket has now been opened for your request and we will contact you directly regarding your inquiry.

We strongly encourage you to review our Help Center for frequently asked questions and up-to-date information about our services, please visit our website .
The searchable knowledge center covers everything from security protocols to streaming services guides. If you are in need of our service related information, we recommend to try this easy to use tool first.

In case you need emergency assistance, go straight to our live chat support accessible from our - this team is here for you 24/7 and answer inquiries in priority sequence.

Once again, thank you for submitting your inquiry. You will be notified when a response is made by email. To add additional comments, please reply to this email.

Kind regards,
NordVPN Support & Customer Care team`,
        isRead: false,
        sentAt: 1656745045000,
        to: 'user@appsus.com'
    }, {
        from: 'Rapidshare AG',
        fromEmail:'support@rapidshare.com',
        id: 'e104',
        subject: 'RapidShare - RapidShare Security-Lock',
        body: `Dear customer,

Your Premium Account has been secured, the RapidShare Security-Lock is active.

The protection can always be deactivated again, by entering this code.

=========================================
Account ID: 15491093
Release-Code: 3828782877
=========================================

Please keep the code secure.

Best regards,

Your RapidShare Support Team

RapidShare AG
Gewerbestrasse 6
6330 Cham
Switzerland

This message is confidential and intended for the recipient only. It is not allowed to copy this message, or to make it accessible for third parties. If you are not the intended recipient, please notify the sender by email.`,
        isRead: true,
        sentAt: 1280135585000,
        to: 'user@appsus.com'
    }, {
        from: 'Amazon.com',
        fromEmail:'auto-confirm@amazon.com',
        id: 'e105',
        subject: 'Your Amazon.com order #111-7436091-1300292',
        body: `Hello,
Thank you for shopping with us. We’ll send a confirmation when your items ship.

Order #111-7436091-1300292

Arriving: April 24

Ship to: Shiran - Kfar Saba, Hamerkaz
Order Total: $54.92

We hope to see you again soon.
Amazon.com`,
        isRead: true,
        sentAt: 1556633936594,
        to: 'user@appsus.com'
    }, {
        from: 'Amazon.com',
        fromEmail:'auto-confirm@amazon.com',
        id: 'e125',
        subject: 'Your Amazon.com order #111-743961-1300692',
        body: `Hello,
Thank you for shopping with us. We’ll send a confirmation when your items ship.

Order #111-743961-1300692

Arriving: May 13

Ship to: Shiran - Kfar Saba, Hamerkaz
Order Total: $15.46

We hope to see you again soon.
Amazon.com`,
        isRead: true,
        sentAt: 1556633916594,
        removedAt: 1556633926594,
        to: 'user@appsus.com'
    }, {
        from: 'Google Play',
        fromEmail:'noreply-developer-googleplay@google.com',
        id: 'e124',
        subject: 'Google Play Developer Program Policy Update',
        body: `Hello Google Play Developer,

In our continued effort to make the Google Play experience safe and positive for developers and users, we have updated the Developer Program Policy in accordance with the law and current best practices.

This email is to notify you of changes to our policies, which are highlighted below.

- A new sensitive events policy addresses sensitivities around tragic events, such as natural disasters or global conflicts.
- To protect users from harm, we've introduced new deceptive behavior language to more clearly define expectations for app functionality.
- We’ve clarified language in the payment policy section for consistency and added links to a supplemental help center article for additional developer support.
- To ensure a secure and consistent customer support experience for our users, we’ve introduced a provision which governs the transfer of in-app virtual currencies purchased in an app.
- We’ve specified that apps should not harm, interfere with, or improperly access Application Programming Interfaces (APIs).

Any new app or app update published after this notification will be immediately subject to the latest version of the Developer Program Policy. If you find any existing apps in your catalog that don’t comply, we ask that you unpublish the app, or fix and republish the app within 30 calendar days of receiving this email. After this period, existing apps discovered to be in violation may be subject to warning or removal from Google Play.

If you have feedback on Play developer terms and policies, we’d appreciate a few moments of your time to fill out a brief survey.

Regards,
The Google Play Team

©2015 Google Inc. 1600 Amphitheatre Parkway, Mountain View, CA 94043

Email preferences: You have received this mandatory email service announcement to update you about important changes to your Google Play service or account.`,
        isRead: true,
        sentAt: 1588133938594,
        to: 'user@appsus.com'
    }, {
        from: 'Google Workspace',
        fromEmail:'workspace-noreply@google.com',
        id: 'e106',
        subject: 'Your transition to Google Workspace is complete',
        body: `Welcome to Google Workspace

As part of the automatic transition we've previously notified you about, your G Suite subscription has now been upgraded to Google Workspace Enterprise Standard.
Enterprise Standard gives you the same features you rely on to connect, create, and collaborate, plus premium business features.`,
        isRead: true,
        sentAt: 1551133970594,
        to: 'user@appsus.com'
    }, {
        from: 'Google Payments',
        fromEmail:'payments-noreply@google.com',
        id: 'e107',
        subject: 'Google Workspace: Your invoice is available',
        body: `Your Google Workspace monthly invoice is available. Please login to your panel to learn more.
IMPORTANT: The balance will be automatically charged so you don’t need to take any action.

Domain: appsus.com
Name: AppSus
Invoice number: 4113304817
Payments profile ID: 5423-4613-0756`,
        isRead: false,
        sentAt: 1656745045000,
        to: 'user@appsus.com'
    }, {
        from: 'UptimeRobot',
        fromEmail:'no-reply@uptimerobot.com',
        id: 'e108',
        subject: 'Your monitors will be deleted in 30 days',
        body: `Hi there!

We noticed that you haven't logged into UptimeRobot web app in the past 3 years.
In order to keep the highest quality of the service for our users, we will delete your monitor(s), uptime records and incidents in 30 days.

If you'd like to keep your monitors running and prevent the deletion just log into your account.`,
        isRead: true,
        sentAt: 1556634930594,
        to: 'user@appsus.com'
    }, {
        from: 'Booking.com',
        fromEmail:'noreply@booking.com',
        id: 'e114',
        subject: `Have a great trip! Here's how to get your reward`,
        body: `Hi,
You're eligible for a reward!
For now this reward is pending. You can see more details below or by visiting the Rewards & Wallet page.
We’ll email you when your reward status changes.

US$14 Cash reward
Status: We're verifying your reward
Details: We'll start processing this reward as soon as it's verified

Go to Rewards & Wallet on Booking.com to see more.`,
        isRead: true,
        sentAt: 1651463845000,
        to: 'user@appsus.com'
    }, {
        from: 'Ship24 - Tracking',
        fromEmail:'no-reply@ship24.com',
        id: 'e116',
        subject: 'Your package UY180556910AZ is on its way 📦',
        body: `Your package is on its way!

Good news, your package UY180556830AZ has been handled by the courier and will arrive soon.`,
        isRead: true,
        sentAt: 1577733970594,
        to: 'user@appsus.com'
    }, {

        from: 'Me',
        fromEmail:'user@appsus.com',
        id: 'e118',
        subject: `Claimed a reward, but points hasn't been decreased`,
        body: `Hello,
I owe collector's account number 188523.

A few days ago, I ordered an amazon voucher from the rewards section- I got a "The order accepted" message.
It's been a while and I saw that my points weren't decrease until now.

Is there something wrong?
Didn't my order sent properly?

Thanks a lot,
Shiran
        `,
        isRead: true,
        sentAt: 1263550385000,
        to: 'support@rapidshare.com'
    }, {

        from: 'Google',
        fromEmail:'no-reply@accounts.google.com',
        id: 'e120',
        subject: 'Security alert',
        body: `We noticed a new sign-in to your Google Account on a Windows device.

If this was you, you don’t need to do anything.
If not, we’ll help you secure your account.`,
        isRead: true,
        sentAt: 1551258960594,
        to: 'user@appsus.com'
    }, {
        from: 'Twitter',
        fromEmail:'notify@twitter.comm',
        id: 'e122',
        subject: 'Your Twitter data is ready',
        body: `Hi,

Your Twitter archive is ready for you to download and view using your desktop browser.
Make sure you download it before March 21, 2019, 2:26:16 AM.

If you didn't request this information, follow the steps on our website to secure your account.

Thanks,
Twitter`,
        isRead: true,
        sentAt: 1552589130594,
        to: 'user@appsus.com'
    }, {
        from: 'GitHub',
        fromEmail:'noreply@github.com',
        id: 'e123',
        subject: '[GitHub] Your personal access token has expired',
        body: `Hey,

Your personal access token "Local Git" with repo scope has expired.

If this token is still needed, visit our website to generate an equivalent.
If you run into problems, please contact support.

Thanks,
The GitHub Team`,
        isRead: true,
        sentAt: 1553265930194,
        to: 'user@appsus.com'
    }]
}