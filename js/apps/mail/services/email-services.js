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
}

function countUnreadEmails(){
    var unreadEmails = 0
    gEmails.forEach(email=>{
        if (email.isRead === false )
        unreadEmails ++
    })
    console.log(unreadEmails)
    return Promise.resolve(unreadEmails)
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

function query() {
    return storageService.query(EMAILS_KEY)
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

function loadEmails() {
    gEmails = [{
        from: 'Yair',
        id: 'e101',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        to: 'momo@momo.com'
    }, {
        from: 'Yair',
        id: 'e102',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        to: 'momo@momo.com'
    }, {
        from: 'Yair',
        id: 'e103',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        to: 'momo@momo.com'
    }, {
        from: 'Yair',
        id: 'e104',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        to: 'momo@momo.com'
    }, {
        from: 'Yair',
        id: 'e105',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        to: 'momo@momo.com'
    }]
}