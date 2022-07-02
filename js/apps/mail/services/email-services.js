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
        from: 'Yair',
        fromEmail:'yair@appsus.com',
        id: 'e101',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551143930594,
        to: 'user@appsus.com',
        removedAt: 1656745045000,
    }, {
        from: 'shiran',
        fromEmail:'yair@appsus.com',
        id: 'e102',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930694,
        to: 'momo@momo.com',
        removedAt: 1581133950594,
    }, {
        from: 'tzlil',
        fromEmail:'yair@appsus.com',
        id: 'e103',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1656745045000,
        to: 'user@appsus.com'
    }, {
        from: 'guy',
        fromEmail:'yair@appsus.com',
        id: 'e104',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1656745045000,
        to: 'user@appsus.com'
    }, {
        from: 'moshe',
        fromEmail:'yair@appsus.com',
        id: 'e105',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1556633936594,
        to: 'user@appsus.com'
    }, {
        from: 'aviv',
        fromEmail:'yair@appsus.com',
        id: 'e124',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1588133938594,
        to: 'user@appsus.com'
    }, {
        from: 'or',
        fromEmail:'yair@appsus.com',
        id: 'e106',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133970594,
        to: 'user@appsus.com'
    }, {
        from: 'dor',
        fromEmail:'yair@appsus.com',
        id: 'e107',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551553936594,
        to: 'user@appsus.com'
    }, {
        from: 'mor',
        fromEmail:'yair@appsus.com',
        id: 'e108',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1556634930594,
        to: 'user@appsus.com'
    }, {
        from: 'haim',
        fromEmail:'yair@appsus.com',
        id: 'e109',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133111594,
        to: 'user@appsus.com'
    }, {
        from: 'cohen',
        fromEmail:'yair@appsus.com',
        id: 'e110',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1554443730594,
        to: 'user@appsus.com'
    }, {
        from: 'shalom',
        fromEmail:'yair@appsus.com',
        id: 'e111',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551155550694,
        to: 'user@appsus.com'
    }, {
        from: 'mom',
        fromEmail:'yair@appsus.com',
        id: 'e112',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1554443970594,
        to: 'user@appsus.com'
    }, {
        from: 'dad',
        fromEmail:'yair@appsus.com',
        id: 'e113',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1577713393029,
        to: 'user@appsus.com'
    }, {
        from: 'shani',
        fromEmail:'yair@appsus.com',
        id: 'e114',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1651463845000,
        to: 'user@appsus.com'
    }, {
        from: 'sharon',
        fromEmail:'yair@appsus.com',
        id: 'e115',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551666630584,
        to: 'user@appsus.com'
    }, {
        from: 'yael',
        fromEmail:'yair@appsus.com',
        id: 'e116',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1577733970594,
        to: 'user@appsus.com'
    }, {
        from: 'sheli',
        fromEmail:'yair@appsus.com',
        id: 'e117',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133922294,
        to: 'user@appsus.com'
    }, {
        from: 'itay',
        fromEmail:'yair@appsus.com',
        id: 'e118',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551144420594,
        to: 'user@appsus.com'
    }, {
        from: 'avner',
        fromEmail:'yair@appsus.com',
        id: 'e119',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551132330594,
        to: 'user@appsus.com'
    }, {
        from: 'yaheli',
        fromEmail:'yair@appsus.com',
        id: 'e120',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551258960594,
        to: 'user@appsus.com'
    }, {
        from: 'kfir',
        fromEmail:'yair@appsus.com',
        id: 'e121',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551365930594,
        to: 'user@appsus.com'
    }, {
        from: 'rotem',
        fromEmail:'yair@appsus.com',
        id: 'e122',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1552589130594,
        to: 'user@appsus.com'
    }, {
        from: 'tomer',
        fromEmail:'yair@appsus.com',
        id: 'e123',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1553265930194,
        to: 'user@appsus.com'
    }]
}