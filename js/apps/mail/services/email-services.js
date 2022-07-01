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
    modifyEmail(emailId, 'removedAt', new Date())
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
    var idx = gEmails.findIndex(email => {
        return email.id === id
    })
    gEmails.splice(idx, 1)
    utilService.saveToStorage(EMAILS_KEY, gEmails)
    location.reload()
    return Promise.resolve()
}

function loadEmails() {
    gEmails = [{
        from: 'Yair',
        id: 'e101',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        to: 'user@appsus.com',
        removedAt: 1551133950594,
    }, {
        from: 'Yair',
        id: 'e102',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        to: 'momo@momo.com',
        removedAt: 1551133950594,
    }, {
        from: 'Yair',
        id: 'e103',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        to: 'user@appsus.com'
    }, {
        from: 'Yair',
        id: 'e104',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        to: 'user@appsus.com'
    }, {
        from: 'Yair',
        id: 'e105',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        to: 'user@appsus.com'
    }]
}