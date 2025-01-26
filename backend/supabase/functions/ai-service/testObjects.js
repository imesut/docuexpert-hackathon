let sampleAgreementText = `
SERVICE AGREEMENT
This Service Agreement ("Agreement") is entered into as of [Date] ("Effective Date") by and between:
1. **[Corporate Buyer’s Legal Name]**, a corporation duly organized and existing under the laws of [State], with its principal office located at [Address], hereinafter referred to as the "Client";
2. **[Startup’s Legal Name]**, a corporation duly organized and existing under the laws of [State], with its principal office located at [Address], hereinafter referred to as the "Service Provider."
The Client and the Service Provider are collectively referred to as the "Parties."
1. Scope of the Agreement
1.1 The Service Provider agrees to integrate its proprietary [Product/Service Name] ("Service") into the Client’s website to enhance accessibility and user experience, in accordance with the clearly defined technical specifications outlined in **Exhibit A**.
1.2 The Service includes the delivery of a JavaScript integration code ("Code") enabling an accessibility menu on the Client’s website, facilitating adjustments to visual elements as per the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA.
2. Obligations of the Parties
2.1 The Client shall pay the agreed fees in accordance with Section 4 of this Agreement and provide the Service Provider with access to the necessary technical infrastructure.
2.2 The Service Provider shall:
- Deliver the Service in a professional and timely manner.
- Ensure compliance with all Americans with Disabilities Act (ADA) applicable laws, regulations, and accessibility standards.
2.3 The Service Provider will not act as an agent or representative of the Client.
3. Service Fee and Payment Terms
3.1 The Client shall pay a monthly service fee of [Amount in USD] plus applicable taxes, invoiced at the start of each month.
3.2 Payment shall be made within [10] days of receipt of the invoice. Failure to pay on time will result in:
- A late payment penalty of 41.5% per month.
- Suspension of services if payment is not received within 30 days of notice.
3.3 If the Client chooses to prepay 12 months of Service, a 10% discount shall apply.
4. Intellectual Property Rights
4.1 The Service Provider retains exclusive ownership of all intellectual property rights in the Code, related documentation, and any updates or modifications.
4.2 The Client is granted a non-exclusive, non-transferable license to use the Service for the duration of this Agreement solely for its internal operations. Upon termination, the Client shall immediately cease using the Service, unless otherwise agreed in writing. Customizations or enhancements developed specifically for the Client may remain accessible under a separate agreement or license.
4.2 The Client is granted a non-exclusive, non-transferable license to use the Service for the duration of this Agreement solely for its internal operations.
4.3 The Service Provider warrants that:
- The Service does not infringe upon any third-party intellectual property rights.
- The Service Provider will indemnify and hold the Client harmless against all claims, losses, and damages resulting from any infringement claim.
4.4 Any modifications or enhancements to the Service requested by the Client shall be owned by the Client solely to the extent they are specific to the Client's operations and do not rely on or integrate proprietary elements of the Service Provider's existing technology. The Service Provider retains a perpetual, royalty-free license to use such modifications or enhancements for its business purposes, including providing similar services to other clients.
4.4 Any modifications or enhancements to the Service requested by the Client shall become the exclusive property of the Client upon completion and payment.
4.5 The Client shall not, and shall ensure that its employees, contractors, or agents do not, attempt to reverse engineer, decompile, disassemble, or otherwise attempt to derive the source code, structure, or underlying technology of the Service.
5. Penalty Clauses
5.1 If the Service Provider fails to deliver the Service in accordance with the specifications or within the agreed timeline, the following penalties shall apply:
- A financial penalty of $10,000 for each instance of non-compliance capped at $50,000 per year..
- Termination of this Agreement if non-compliance is not remedied within 15 days of notice.
5.2 Any data breaches or security incidents caused by the Service Provider will result in:
- Immediate notification to the Client.
- Payment of damages, including the cost of remediation and compensation to affected users.
6. Confidentiality
6.1 The Parties shall keep all non-public information confidential and use such information solely for the purposes of fulfilling their obligations under this Agreement.
6.2 Confidentiality obligations shall survive the termination of this Agreement.
7. Term and Termination
7.1 This Agreement shall remain in effect for a term of 12 months, renewable upon mutual written consent.
7.2 The Client may terminate this Agreement immediately for cause, including:
- Breach of the Agreement by the Service Provider.
- Failure to meet agreed performance standards.
7.3 Upon termination, the Service Provider shall:
• Cease use of the Client’s intellectual property.
• Delete or return all Client data within 10 business days, except as required for compliance with legal, regulatory, or archival purposes.
• Retain anonymized and aggregated data for analytical or research purposes, provided such data does not identify the Client or its users.

7.3 Upon termination, the Service Provider shall:
- Cease use of the Client’s intellectual property.
- Delete or return all Client data within 10 business days.
7.4 The Client agrees not to develop or procure a similar service or solution based on the proprietary technology or methodologies of the Service Provider for a period of six months one year following the termination of this Agreement, except with the written consent of the Service Provider.
8. Dispute Resolution
8.1 Any disputes arising under this Agreement shall be resolved through arbitration in [City, State], in accordance with the rules of the American Arbitration Association.
8.2 The prevailing party in any dispute shall be entitled to recover reasonable attorney’s fees and costs, not exceeding $50,000..
9. Miscellaneous
9.1 This Agreement constitutes the entire agreement between the Parties and supersedes all prior agreements.
9.2 This Agreement may only be amended in writing signed by both Parties.
Signatures
**[Corporate Buyer’s Legal Name]**
By: __________________________
Name: [Authorized Representative]
Title: [Title]
Date: [Date]
**[Startup’s Legal Name]**
By: __________________________
Name: [Authorized Representative]
Title: [Title]
Date: [Date]
`

let defaultExperts = [
    {
        abbvr: "TA",
        name: "Todo Agent",
        description:
            "Keeps track of what has been talked; uses your meeting records and your comments to follow actions.",
        prompt: "Summarize the todos from transcript.",
        isDefaultExpert: true,
    },
    {
        abbvr: "CE",
        name: "Commercial Expert",
        description: "Suggests and keeps commercial focused suggestions.",
        prompt: "Always try to maximize profits.",
        isDefaultExpert: true,
    },
    {
        abbvr: "IP",
        name: "Intellectual Property Expert",
        description: "Suggests and keeps your intellectual property rights guarenteed.",
        prompt: "You're an expert in IP law, offer or weighten the items which will preserve the intellectual properties.",
        isDefaultExpert: true,
    }
]


let exampleSuggestions = [
    {
        old_version: "the commission will be 5%",
        new_version: "the commission will be 10%",
        by: "TA",
        remarks: [
            { appropriate: true, expertcode: "TA" },
            { appropriate: false, expertcode: "CE", comment: "higher commission means lower margin for seller, you may try to convince buyer to lower this." },
            { appropriate: true, expertcode: "IP" },
        ]
    },
    {
        old_version: "the GDPR precautions will be taken by seller",
        new_version: "the GDPR precautions should be taken together through a common data share protocol",
        comment: "both buyer and seller has agreed upon this change in the meeting.",
        by: "TA",
        remarks: [
            { appropriate: true, expertcode: "TA" },
            { appropriate: true, expertcode: "CE" },
            { appropriate: false, expertcode: "IP", comment: "Sharing data may cause an indirect loss of trade secrets." },
        ]
    }
]

let exampleTranscript = `
00:00:09 - We Hack Together (wehackt@gmail.com)
    Hi gentlemen, good to see you again, how it is over at DEF these days.
00:00:16 - Canan B.
    Hi gentlemen, nice to see you, things are busy as always, you know how it is marketing plans and less emails and an every ending to do list, how about you?
00:00:32 - We Hack Together (wehackt@gmail.com)
    Same here, startups are basically 24 hours, 7 days, cars, but I guess that's part of the fun, right?    I barely know what day it is sometimes.
00:00:45 - Canan B.
    I hear you, at least you get to set the cows.    For me, it just endless meetings.
00:00:54 - We Hack Together (wehackt@gmail.com)
    Well, hopefully this meeting will be less of a headache, I'm super excited about this process.    direct with DEF.    I really think this partnership can set a new standard for web accessibility.
00:01:07 - Canan B.
    Absolutely.    Accessibility is such a huge focus for us and your expertise really adds value.    But let's see if we can align on this contracts first.    You know how corporate legal teams are.    They don't let anything slide.
00:01:26 - We Hack Together (wehackt@gmail.com)
    Of course, I get it.    Let's dive into detail then.    I've got my AI assistant ready to keep me on track if we go into the weeds.
00:01:36 - Canan B.
    AI assistant?    All right, now I'm curious.    Let's see how it does under pressure.    Before we dive deeper, let's start with 1.1.    made a slight tweak here to ensure the technical specifications in exhibits A are clearly    defined a device a cloud now states in accordance with the clearly defined technical specifications outlined in exhibit A.
00:02:13 - We Hack Together (wehackt@gmail.com)
    Ah, I noticed that.    me pull it up.    Um, just a second.    Okay.    Yes.    That makes sense.    What was the reasoning behind the change?
00:02:30 - Canan B.
    Um, it's really about clarity.    The original cloud left too much room for interpretation by specifying clearly defined.    We ensure both parties fully understand the deliverables.    This helps avoid any confusion or disagreements down the line.
00:02:51 - We Hack Together (wehackt@gmail.com)
    Got it.    I think that's a solid just from clear specs benefit everyone.
00:02:59 - Canan B.
    And what    About 4.2, a little something close, I noticed you add something about post termination rights.
00:03:12 - We Hack Together (wehackt@gmail.com)
    Yes, great catch.    We updated it to clarify that upon termination you would cheat a chest using the service unless we agree otherwise.    This just ensures there is no ambiguity if the partnership ends.
00:03:30 - Canan B.
    That's fine but what about the customizations if we are paying for those we need to continue to access even if the broader service is no longer available?
00:03:44 - We Hack Together (wehackt@gmail.com)
    Absolutely.    That's why the clause allows for a separate agreement for customizations.    If you want to retain access to those after termination we can work out a licensing agreement just for those elements.
00:04:01 - Canan B.
    Fair enough, I will make a lot of that.
00:04:08 - We Hack Together (wehackt@gmail.com)
    So let's move to section 4.4 about modifications and ownership.    Originally, the cloud said that any modifications requested by DEF would be exclusively yours.    But, we updated to clarify that modifications specific to DEF's needs are your property, while anything that overlaps with our existing technology can still be used by us for other clients.
00:04:39 - Canan B.
    Okay, I see where you are coming from, but from our perspective, and that might get tricky.    If a modification starts as something unique to DEF and later became small general, how do we ensure we start?    still retain exclusivity for our needs.
00:05:05 - We Hack Together (wehackt@gmail.com)
    Great question, as always, Journal.    The clause actually addresses that it explicitly is hard to say that word, states that only the parts unique to DEF are your property.    For anything, overlapping with our broader technology, we retain a license to use it.    It's designed to be a pair to both sides, ensuring you get what's uniquely yours, but we can still innovate for other clients.
00:05:38 - Canan B.
    Alright, I would like this for our legal team to review, but it makes sense so far.    Let's keep going.    And now, let's talk about 4.5, the joint development clause.
00:05:54 - We Hack Together (wehackt@gmail.com)
    Ah yes, this is new, if we end up working together all of us.    feature or enhancement, the class gives both parties joint ownership.    With each retaining a license to use it, it's meant to avoid any who owns what's confusion down the line.
00:06:16 - Canan B.
    Sounds good on paper, but you know, legal teams love confusion.    It keeps them busy.    will check if these aligns with our policies.    Okay, let's speak one for me, 7.3 about data ownership and use post termination.
00:06:46 - We Hack Together (wehackt@gmail.com)
    Oh, you said use post termination, right?    We adjusted it to allow us to retain anonymized and aggregated data for research and development purposes.    This doesn't include any    In identifiable the EF data, of course.
00:07:06 - Canan B.
    Anonymize is fine, but our team might want tighter directions.    Let's say no external sharing, given if anonymized.
00:07:17 - We Hack Together (wehackt@gmail.com)
    At a point, we can limit it to internal use only.
00:07:23 - Canan B.
    Great, let's work.
00:07:27 - We Hack Together (wehackt@gmail.com)
    All right, I think we have covered all the key points to summarize.    1.1 technical specifications are now clearly defined for for better clarity.    Sorry, 4.2 post termination access to customizations can be arranged separately.    4.4 modifications specific to the EF remain yours, elements stay with us..5 joint development ensures fair or    the ship for both sides, 7.3 anonymized data states, internal only.
00:08:07 - Canan B.
    That's a solid summary.    I will send these notes to our legal team for final review, but I think we are almost there.
00:08:18 - We Hack Together (wehackt@gmail.com)
    Fantastic!    And hey, maybe next time the AI can do all negotiating for us.
00:08:27 - Canan B.
    Careful what you wish for, John.    Hey, I might negotiate you out of a job.
00:08:35 - We Hack Together (wehackt@gmail.com)
    Swishay, thanks, John.    Looking forward to wrapping this up soon.
00:08:40 - Canan B.
    Same here, have a great day.
00:08:42 - We Hack Together (wehackt@gmail.com)
    Yeah, have a nice weekend.    Bye-bye.
`

console.log(
    {
        "agreementText" : sampleAgreementText,
        "experts" : defaultExperts,
        "transcriptText": exampleTranscript,
        "additionalSystemPrompt" : ""
    }
)