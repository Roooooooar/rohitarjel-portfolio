document.addEventListener('DOMContentLoaded', () => {
    
    // --- Tabs Functionality ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Find target pane and add active class
            const targetId = btn.getAttribute('data-tab');
            const targetPane = document.getElementById(targetId);
            if(targetPane) {
                targetPane.classList.add('active');
            }
        });
    });

    // --- Before/After Slider Functionality ---
    // Support multiple sliders on the same page by iterating over all instances
    const allSliders = document.querySelectorAll('.before-after-slider');

    allSliders.forEach(slider => {
        const afterImage = slider.querySelector('.after-image');
        const sliderHandle = slider.querySelector('.slider-handle');
        let isDragging = false;

        if (!afterImage || !sliderHandle) return;

        // Set initial state to 50%
        let sliderPos = 50;
        updateSlider();

        function updateSlider() {
            afterImage.style.clipPath = `polygon(${sliderPos}% 0, 100% 0, 100% 100%, ${sliderPos}% 100%)`;
            sliderHandle.style.left = `${sliderPos}%`;
        }

        function slideContent(xPos) {
            const rect = slider.getBoundingClientRect();
            let percentage = ((xPos - rect.left) / rect.width) * 100;
            percentage = Math.max(0, Math.min(percentage, 100));
            sliderPos = percentage;
            updateSlider();
        }

        // Mouse Events
        slider.addEventListener('mousedown', (e) => {
            isDragging = true;
            slideContent(e.clientX);
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            slideContent(e.clientX);
        });

        // Touch Events
        slider.addEventListener('touchstart', (e) => {
            isDragging = true;
            slideContent(e.touches[0].clientX);
        }, { passive: true });

        window.addEventListener('touchend', () => {
            isDragging = false;
        });

        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            slideContent(e.touches[0].clientX);
        }, { passive: false });
    });

    // --- Modal Functionality ---
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const modal = document.getElementById('work-modal');
    const modalBody = document.getElementById('modal-body-content');
    const progressBar = document.getElementById('modal-progress');
    
    // Video Modal Elements
    const videoTriggers = document.querySelectorAll('.video-modal-trigger');
    const videoModal = document.getElementById('video-modal');
    const videoBody = document.getElementById('video-body-content');

    // All close buttons
    const closeBtns = document.querySelectorAll('.modal-close');

    // Video mapping (placeholders - replace with actual YouTube embed URLs later)
    const videoContentMap = {
        'video1': '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        'video2': '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    };

    // Placeholder content mapping
    const modalContentMap = {
        'email1': `
<div class="sequence-info" style="margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid var(--glass-border);">
    <h2 style="font-size: 1.5rem; margin-bottom: 10px;">Re-engagement Sequence For Men's Relationship Niche</h2>
    <p style="color: var(--text-secondary);">The goal of this sequence is to win back subscribers who haven’t opened, read, or clicked any of our emails for more than six months.</p>
</div>
<div class="email-content">
    <h4 style="color: var(--accent); margin-bottom: 15px;">Day 1</h4>
    <p><strong>Subject Line: Is everything all right, {name}?</strong></p><br>
    <p>What you do when you haven't heard from someone in a looong while? Well, you send them a text, right?</p>
    <p>This is why I'm reaching you out.</p>
    <p>My "email software" says you haven’t opened my emails for a looong time.</p>
    <p>And if you’re like me, who suffers from CRS (Can’t Remember Shit), then chances are, you don’t recall who I am, what I do, and why you signed up for my list.</p>
    <br><p>Well, allow me to introduce myself:</p>
    <p><em>What will you say if your perfect lead curiously asks you, “who are you, and what do you do?” {more introduction, more introduction}</em></p><br>
    <p>Enough intro.</p>
    <p>Now that we know each other… I would like to surprise you with some wicked-awesome things which happened when you were not around.</p><br>
    <p>1/ A free dating quiz which reveals how good your “game” is:<br><a href="#" style="color: var(--accent); font-weight: bold;">www.link.com</a></p><br>
    <p>2/ A report on 5 conversation mistakes men make that destroy attraction:<br><a href="#" style="color: var(--accent); font-weight: bold;">www.link.com</a></p><br>
    <p>3/ {One more cool gift}:<br><a href="#" style="color: var(--accent); font-weight: bold;">www.link.com</a></p><br>
    <p>Check ‘em out.</p>
    <p>Signature</p><br>
    <p><em>PS- Since you haven’t read my emails in a long while… so I am paranoid my emails may land in your promotional or spam folder. And to ensure this doesn't happen, I will send you a similar email this week.</em></p>
</div>
<hr style="margin: 40px 0; border: none; border-top: 1px solid var(--glass-border);">
<div class="email-content">
    <p style="color: var(--text-secondary); margin-bottom: 15px; font-style: italic;">If they don’t open and/or click the first email, send:</p>
    <h4 style="color: var(--accent); margin-bottom: 15px;">Day 3</h4>
    <p><strong>Subject Line: I’m suffering from CRS, please listen.</strong></p><br>
    <p>Hey, long time no see.</p>
    <p>My “email software” says you haven’t opened my emails for a very, very, long time.</p>
    <p>And if you’re like me, who suffers from CRS (Can’t Remember Shit), then chances are, you don’t recall who I am, what I do, and why you signed up for my list.</p>
    <p>Well, allow me to introduce myself:</p><br>
    <p><em>What will you say if your perfect lead curiously asks you, “who are you, and what do you do?” {more introduction, more introduction}</em></p><br>
    <p>Enough intro.</p>
    <p>Now that we know each other… I would like to surprise you with some wicked-awesome things that happened when you were not around.</p><br>
    <p>1/ A free dating quiz which reveals how good your “game” is:<br><a href="#" style="color: var(--accent); font-weight: bold;">www.link.com</a></p><br>
    <p>2/ A report on 5 conversation mistakes men make that destroy attraction:<br><a href="#" style="color: var(--accent); font-weight: bold;">www.link.com</a></p><br>
    <p>3/ {One more cool gift, maybe a video, or anything cool}<br><a href="#" style="color: var(--accent); font-weight: bold;">www.link.com</a></p><br>
    <p>Check ‘em out.</p>
    <p>Signature</p>
</div>
<hr style="margin: 40px 0; border: none; border-top: 1px solid var(--glass-border);">
<div class="email-content">
    <p style="color: var(--text-secondary); margin-bottom: 15px; font-style: italic;">If they don’t open and/or click the second email, send:</p>
    <h4 style="color: var(--accent); margin-bottom: 15px;">Day 5</h4>
    <p><strong>Subject Line: Negatively positive or Positively negative?</strong></p><br>
    <p>I know someone who's a BIG believer in positive thinking.</p>
    <p>I mean BIG-BIG believer.</p>
    <p>So much so that when he texts a girl to ask her out for a date, but she ghosts him… instead of assuming - she ignored him as$, he will assume - she changed her phone number.</p>
    <p>Silly, I know.</p>
    <p>Anyways, this reminds me:</p>
    <p>My "email software" says you haven't read my emails from the past 6 months, and maybe, just maybe, you too have changed your email address. And you are not actively using this email.</p><br>
    <p>If this is the case, then you can tap this link - <a href="#" style="color: var(--accent); font-weight: bold;">www.link.com</a> - and sign up to my list with your primary email, once again.</p><br>
    <p>Signature</p><br>
    <p><em>PS- By the way, if you’re actively using this email address, you don’t have to sign up again. Rather, visit the following fantabulous links… so I know you’re still active, and you would like to read my new email musings.</em></p><br>
    <p>1/ A free dating quiz which reveals how good your “game” is:<br><a href="#" style="color: var(--accent); font-weight: bold;">www.link.com</a></p><br>
    <p>2/ A report on 5 conversation mistakes men make that destroy attraction<br><a href="#" style="color: var(--accent); font-weight: bold;">www.link.com</a></p><br>
    <p>3/ {One more cool gift}<br><a href="#" style="color: var(--accent); font-weight: bold;">www.link.com</a></p><br>
    <p><em>PPS- If you’re like me, who suffers from CRS syndrome (Can’t Remember Shit Syndrome), then chances are, you don’t recall who I am, what I do, and why you signed up for my list.</em></p>
    <p>Well, allow me to introduce myself:</p>
    <p>{INTRODUCTION, same as first email}</p>
    <p>Enough.</p>
</div>
<hr style="margin: 40px 0; border: none; border-top: 1px solid var(--glass-border);">
<div class="email-content">
    <p style="color: var(--text-secondary); margin-bottom: 15px; font-style: italic;">If they don’t open and/or click the third email, send:</p>
    <h4 style="color: var(--accent); margin-bottom: 15px;">Day 7</h4>
    <p><strong>Subject Line: Am I an annoying pest or a welcome guest?</strong></p><br>
    <p>As I write this email…</p>
    <p>I have a gloomy thought that sometimes, when you see my name in your inbox, you think, for whatever reason, I am an “annoying” pest.</p>
    <p>I know, it's not true</p>
    <p>But still, I will go all the way by sharing 3 righteous resources… so that whenever you see my name in your inbox, you think of me as a “welcome” guest.</p>
    <p>Here they are:</p><br>
    <p>1/ A dating quiz which reveals how good your game is:<br><a href="#" style="color: var(--accent); font-weight: bold;">www.link.com</a></p><br>
    <p>2/ Five conversation mistakes men make that destroy attraction<br><a href="#" style="color: var(--accent); font-weight: bold;">www.link.com</a></p><br>
    <p>3/ {another free gift}<br><a href="#" style="color: var(--accent); font-weight: bold;">www.link.com</a></p><br>
    <p>Oh, WAIT…</p>
    <p>Let’s make things hotter.</p>
    <p>How about this:</p>
    <p>If after checking all resources (quiz, report, and xyz) above… yet, you find zero value; OR you feel I can't help you with confidence, charisma, and dating; OR unprecedented of all, you think of me as an “annoying” pest... then feel free to unsubscribe by clicking the link at the bottom of this email.</p><br>
    <p>Peace.</p>
    <p>Signature</p>
</div>
        `,
        'email2': `
<div class="sequence-info" style="margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid var(--glass-border);">
    <h2 style="font-size: 1.5rem; margin-bottom: 10px;">Promotional Email Sequence for a Marketing Consultant</h2>
    <p style="color: var(--text-secondary);">The audience struggles with creating content and monetizing their social media followers. The goal of these emails is to invite them to a content creation challenge that teaches them how to post consistently and monetize their audience.</p>
</div>
<div class="email-content">
    <h4 style="color: var(--accent); margin-bottom: 15px;">Email 1</h4>
    <p><strong>Subject Line: I am back with a good news</strong></p><br>
    <p>I know, I haven’t emailed you in a looong while, but not anymore.</p>
    <p>Because I am back.</p>
    <p>And, I am back with a GOOD news.</p>
    <p>This month, I am running a free Content Creation Challenge. In this challenge, I reveal juicy strategies for creating money-making content. You know, I use these same strategies for my own personal brand - as well as the brands of clients I work with. (No bragging, but they pay me almost $___ every month - for some of these strategies)</p><br>
    <p>Anyways, this is a 5-day email challenge.</p>
    <p>And each day, we’ll learn one fresh topic.</p>
    <p>So chill, you won’t be overwhelmed at all.</p>
    <p>And by the end of the 5th day, you'll have many new content-creation weapons in your arsenal.</p>
    <p>Oh and, did I tell you it’s absolutely free?</p>
    <p>Yep, absolutely free.</p><br>
    <p>To register for this challenge, visit the page below and drop your email address:</p>
    <p><a href="#" style="color: var(--accent); font-weight: bold;">https://jelenaostrovska.systeme.io/challenge-optin</a></p><br>
    <p>Jelena Ostrovska<br>“NO B.S. Content Strategist”</p><br>
    <p><em>P.S. Here's a taste of what you’ll learn in the FREE content creation challenge:</em></p>
    <ul style="margin-left: 20px;">
        <li style="margin-bottom: 8px;">A proven method to position yourself as superior to those competitors who have more proof, more followers, and more authority than you. (This method is so potent that it works, even if you started your social media brand a month ago - shared on DAY 4)</li>
        <li style="margin-bottom: 8px;">The RIGHT way to "flex" your expertise (without being obnoxiously arrogant)... and become the go-to person of your niche so you attract high-ticket clients - on DAY 2</li>
        <li style="margin-bottom: 8px;">Believe it or not, quality lead and prospect “brain” want to read your blatant sales pitch. I will explain the psychology behind this on DAY 5</li>
        <li style="margin-bottom: 8px;">Science says: A stranger makes an impression of you in the first 7 seconds of meeting you. The same is true in social media, too. Your new followers and prospects make an impression on you in the first 7 seconds of landing in your profile. I will tell you EXACTLY what to do on DAY 1 - so you always leave a positive and pleasant first impression in their mind.</li>
        <li style="margin-bottom: 8px;">How can you realistically "ramp up" your engagement rates? No, no, you don't have to dance on reels - or sell your soul to the algorithm.</li>
        <li style="margin-bottom: 8px;">The #1 mistake that is bleeding your sales and customers (Hint: It’s not your content quality or engagement rates)! Revealed on DAY 5</li>
        <li style="margin-bottom: 8px;">How I plan and write a strategic sales post. One time I wrote and published a sales post, in less than ___ minutes. And guess what? The next day, I got dms of new inbounds eagerly requesting my services! (I will tell you how to write such posts on DAY 5)</li>
        <li style="margin-bottom: 8px;">Paraphrasing an "8-billion-dollar marketer": If you're not promoting your products, then you're a selfish and unethical human - explained on DAY 5</li>
        <li style="margin-bottom: 8px;">A ridiculously simple content-creation trick used by Napoleon Hill (in his world-famous book, Think & Grow Rich) to sell more than 100 million copies... and make people addicted to reading the book again and again. I will tell you what the trick is on DAY 3... and how you can use it to sell more of your products - and make your readers addicted to your brand.</li>
    </ul><br>
    <p>And much, much more...</p>
    <p>Again, to join the challenge visit the webpage below and drop your email: <a href="#" style="color: var(--accent); font-weight: bold;">https://jelenaostrovska.systeme.io/challenge-optin</a></p>
</div>
<hr style="margin: 40px 0; border: none; border-top: 1px solid var(--glass-border);">
<div class="email-content">
    <h4 style="color: var(--accent); margin-bottom: 15px;">Email 2</h4>
    <p><strong>Subject Line: I stabbed and killed my...</strong></p><br>
    <p>When I was 20, I developed a BIG self-limiting belief.</p>
    <p>And this belief was so deeply ingrained in my brain—because of my upbringing in schools and society.</p>
    <p>Everyone around me preached:</p>
    <p>"A teacher is always older than students, never otherwise."</p>
    <p>So, as a 20-year-old entrepreneur, when I began teaching and selling my knowledge to clients—who were usually older than me—I felt stifled around them. I felt under-confident, even when I was sharing the RIGHT things. And I felt I didn’t deserve to charge the price I was charging.</p>
    <p>But it didn’t stop there.</p>
    <p>The ugliest part of this limiting belief was—it unfolded in other areas of my business, especially sales. Even after giving so much “free value” to my audience, I was still hesitant to ask for the sale. Because apparently, ‘asking for the sale’ would make me a broke and needy person.</p>
    <p>You see, this limiting belief stabbed me.</p>
    <p>Both mentally and financially to kill my growth.</p>
    <p>Now, I know it sounds like a sob story.</p>
    <p>But actually it isn’t</p>
    <p>Why?</p>
    <p>Because I have flipped the script.</p>
    <p>Instead of getting stabbed, I finally slayed this self limiting belief.</p>
    <p>How? Well, it was a long process of personal development. But the catalyst was this ONE concept I learned from one of my business mentors.</p>
    <p>This concept is simple, yet profound.</p>
    <p>Once you truly understand it—your entire worldview about pitching your products and charging higher prices to clients will change.</p>
    <p>And the good news is:</p>
    <p>I share this concept in my upcoming content creation challenge.</p>
    <p>So if you’re someone who suffers from such self-limiting beliefs, and you want to slay it like I did—then I suggest you register for my challenge, here:</p>
    <p><a href="#" style="color: var(--accent); font-weight: bold;">https://jelenaostrovska.systeme.io/challenge-optin</a></p>
    <p>Simply visit the above link, and drop your email address.</p>
    <p>By the way, this challenge begins on 21 October.</p>
    <p>And it’s absolutely free.</p>
    <p>So if you're interested, register right NOW, while you still can.</p><br>
    <p>Giddy up,</p>
    <p>Jelena Ostrovska</p>
    <p>“NO B.S. Content Strategist”</p>
</div>
<hr style="margin: 40px 0; border: none; border-top: 1px solid var(--glass-border);">
<div class="email-content">
    <h4 style="color: var(--accent); margin-bottom: 15px;">Email 3</h4>
    <p><strong>Subject Line: Napoleon Hill's marketing “trick” worth 100 million book sales</strong></p><br>
    <p>The mentor of all mentors:</p>
    <p>Napoleon Hill</p>
    <p>Without a doubt, his classic ‘Think & Grow Rich’ is the highest-selling self-help book of all time. In fact, this single book sparked the entire personal development movement we see today.</p>
    <p>And guess what?</p>
    <p>Every time someone achieves such exceptional results - there's always a strategic process behind it.</p>
    <p>Get this - exceptional results don't happen by accident.</p>
    <p>Anyway, as I was re-reading the book, Think & Grow Rich, I realised Napoleon Hill strategically used a simple trick again and again, in all the chapters... to make readers addicted to the book. And this trick is, I believe, the biggest reason why it sold more than 100 million copies.</p>
    <p>Since then, I noticed other best-selling books (like Rich Dad Poor Dad, How to Win Friends & Influence People, and so on...) use this same trick.</p>
    <p>And the funny thing is:</p>
    <p>This trick is ridiculously simple.</p>
    <p>Chances are, most people know what it is.</p>
    <p>Yet, some of them never use it.</p>
    <p>And some others shoot themselves in the foot by using it the wrong way. But not me.</p>
    <p>And all my readers who have joined my free content creation challenge. In the challenge, I will tell you what the trick is. Plus, how to use it strategically in your daily content to increase your product sales… and make readers addicted to your brand.</p>
    <p>To register for this challenge, go here and pop your email address:</p>
    <p><a href="#" style="color: var(--accent); font-weight: bold;">https://jelenaostrovska.systeme.io/challenge-optin</a></p><br>
    <p>Remember, this is a free challenge.</p>
    <p>And it starts on 21 October.</p>
    <p>So gear up, and register while you still can.</p><br>
    <p>See you there,</p>
    <p>Jelena Ostrovska</p>
    <p>“No B.S. Content Strategist”</p>
</div>
<hr style="margin: 40px 0; border: none; border-top: 1px solid var(--glass-border);">
<div class="email-content">
    <h4 style="color: var(--accent); margin-bottom: 15px;">Email 4</h4>
    <p><strong>Subject Line: How do I get high-ticket clients demanding to hire me?</strong></p><br>
    <p>One of my first mentors was Ray Higdon.</p>
    <p>He is a great network marketer.</p>
    <p>And though, I am not in that industry anymore - the lessons I learned from him played a HUGE part in my career.</p>
    <p>It still does.</p>
    <p>Two big lessons were:</p>
    <p>Prospecting and blogging.</p>
    <p>I know, I know… many people think blogging doesn't work anymore. But honestly, if it wasn’t for blogging during that time… I don’t think I would be around in the industry today, and be as successful as some people say I am.</p>
    <p>You see, as I began blogging, what happened was…</p>
    <p>I could position myself as an expert; an authority; a go-to person in my niche. This is the same advice I give to my clients:</p>
    <p>You have to be the go-to person on social media.</p>
    <p>And doing this will turn the tables.</p>
    <p>Because then, instead of you chasing clients, your clients will chase you down. They will feel privileged to work with you. And, even happy to pay outrageous fees because they think of you as an expert.</p>
    <p>That’s amazing, right?</p>
    <p>But every time I share this advice, I usually get this question:</p>
    <p>“My niche is SO competitive. It’s not like 2020 when social media wasn’t saturated, and all my big competitors weren’t as big as they are today. Can I still be the go-to person in my niche?”</p>
    <p>My answer?</p>
    <p>Yes, you absolutely can.</p>
    <p>In my free 5-day Content-Creation Challenge, I share many strategies to become an expert and go-to in the eyes of your audience.</p><br>
    <p>If you’re at all interested in learning these strategies, then register for the challenge, here:</p>
    <p><a href="#" style="color: var(--accent); font-weight: bold;">https://jelenaostrovska.systeme.io/challenge-optin</a></p>
    <p>This challenge is absolutely free.</p>
    <p>But it starts on 21 October.</p>
    <p>After 3 short days</p>
    <p>So time is slipping away.</p><br>
    <p>Jump on the above link, and register right NOW.</p>
    <p>Jelena Ostrovska</p>
    <p>“No B.S Content Strategist”</p>
</div>
<hr style="margin: 40px 0; border: none; border-top: 1px solid var(--glass-border);">
<div class="email-content">
    <h4 style="color: var(--accent); margin-bottom: 15px;">Email 5</h4>
    <p><strong>Subject Line: 100K in Insta, but $0 in the bank</strong></p><br>
    <p>Sad but true story:</p>
    <p>Recently, I read about a woman who hit a HUGE milestone on Instagram. She hit 100K followers in less than one month.</p>
    <p>Her niche?</p>
    <p>Teaching English to French speakers.</p>
    <p>As a non-native English speaker myself, I know how hard learning English can be - so it seems, she picked a good niche.</p>
    <p>But here’s the problem:</p>
    <p>Even with a good niche and 100K followers, she still hasn’t made a single penny. Yes, 100K on Insta, but $0 in the bank.</p>
    <p>This is nothing new, by the way.</p>
    <p>I see brands with big audiences and high engagement, yet they don’t know how to promote, and how to sell their offers.</p>
    <p>And guess what?</p>
    <p>This is the difference between building an audience vs building a business.</p>
    <p>Building an audience will bring high followers & high engagement - but it will NOT bring food to the table. Building an audience will feed your ego - but it will NOT feed yourself or your family.</p>
    <p>Now, I'm not saying audience building is useless.</p>
    <p>It’s important.</p>
    <p>But what’s the point of pouring your time, energy, and money into building an audience (just like this woman) and yet receiving very little or no money from them?</p>
    <p>It's pointless.</p>
    <p>And a complete waste of time.</p>
    <p>Anyways, if you ever meet this woman (or anyone who has decent followers on social media but they are struggling to monetize it), then tell 'em about my free content creation challenge:</p>
    <p><a href="#" style="color: var(--accent); font-weight: bold;">https://jelenaostrovska.systeme.io/challenge-optin</a></p>
    <p>In the challenge, I not only reveal how to monetize social media audience - but also many other powerful concepts like… how to write content that speaks directly to your audience, helps you be the go-to person of your niche, and more.</p><br>
    <p>By the way, this challenge is free.</p>
    <p>But it begins on 21 October.</p>
    <p>(i.e. after 2 days).</p>
    <p>So join before time slips away.</p><br>
    <p>Jelena Ostrovska</p>
</div>
<hr style="margin: 40px 0; border: none; border-top: 1px solid var(--glass-border);">
<div class="email-content">
    <h4 style="color: var(--accent); margin-bottom: 15px;">Email 6</h4>
    <p><strong>Subject Line: An open letter to all who think content creation is too much work</strong></p><br>
    <p>Or who are inconsistent with content creation.</p>
    <p>Or who feel frustrated with low engagement - even after pumping daily content on social media.</p>
    <p>Hear me out:</p>
    <p>My free content creation challenge will begin tomorrow.</p>
    <p>If you’ve already registered, thank you sooo much. I'm super excited to have you on board!</p>
    <p>But if you haven’t, then I will give my “last shot” by sharing some of the strategies… which I will reveal to all the participants during the challenge:</p>
    <ul style="margin-left: 20px;">
        <li style="margin-bottom: 8px;">A proven content-marketing method to position yourself as superior to those competitors who have more proof, more followers, and more authority than you.</li>
        <li style="margin-bottom: 8px;">The RIGHT way to "flex" your expertise (without being obnoxiously arrogant)... and become the go-to person of your niche so you attract high-ticket clients.</li>
        <li style="margin-bottom: 8px;">Believe it or not, quality lead and prospect “brain” want to read your blatant sales pitch.</li>
    </ul><br>
    <p>I can go on and on…</p>
    <p>But you get the idea.</p>
    <p>To join the challenge, visit the link below, and pop in your email address:</p>
    <p><a href="#" style="color: var(--accent); font-weight: bold;">https://jelenaostrovska.systeme.io/challenge-optin</a></p>
    <p>As of now, ___ readers have joined.</p>
    <p>And, by the end of the 5th DAY of the challenge, they all will be armed with all the content creation strategies I listed above.</p>
    <p>So go register if you haven't already.</p><br>
    <p>Jelena Ostrovska<br>“No B.S. Content Strategist”</p>
</div>
        `,
        'script1': `
            <div class="script-content">
              <h2 class="script-headline">The Smart Home Gym - Aroleap X</h2>
              
              <div class="script-scene">
                <h4>SHOT 1</h4>
                <p class="scene-visual"><strong>VISUAL:</strong> Model in gym outfit. She is sitting on the sofa at home, putting on her gym shoes, getting ready for her Aroleap session.</p>
                <blockquote class="scene-audio">"Nobody talks about how uncomfortable gym can be for a woman."</blockquote>
              </div>

              <div class="script-scene">
                <h4>SHOT 2</h4>
                <p class="scene-visual"><strong>VISUAL:</strong> Still lacing up, she pulls the lace tight on one shoe.</p>
                <blockquote class="scene-audio">"The late-night commute" "The gym crowd…"</blockquote>
              </div>

              <div class="script-scene">
                <h4>SHOT 3</h4>
                <p class="scene-visual"><strong>VISUAL:</strong> She looks at the camera.</p>
                <blockquote class="scene-audio">"And those creepy men who stare at you when you are working out."</blockquote>
              </div>

              <div class="script-scene">
                <h4>SHOT 4</h4>
                <p class="scene-visual"><strong>VISUAL:</strong> Close up on her face.</p>
                <blockquote class="scene-audio">"It is SO disgusting."</blockquote>
              </div>

              <div class="script-scene">
                <h4>SHOT 5</h4>
                <p class="scene-visual"><strong>VISUAL:</strong> She stands up from the sofa</p>
                <blockquote class="scene-audio">"That is why I quit gyms completely. Now I just work out right here at home. And Aroleap X makes it possible. Come, let me show you."</blockquote>
              </div>

              <div class="script-scene">
                <h4>SHOT 6</h4>
                <p class="scene-visual"><strong>VISUAL:</strong> Camera follows her from behind as she walks toward Aroleap on the wall. She stops in front of it, turns around to face the camera.</p>
                <blockquote class="scene-audio">"This is a smart gym that sits on your home wall just like a TV"</blockquote>
              </div>

              <div class="script-scene">
                <h4>SHOT 7</h4>
                <p class="scene-visual"><strong>VISUAL:</strong> Close up on the Aroleap screen scrolling through exercises.</p>
                <blockquote class="scene-audio">"It has 150+ guided exercises."</blockquote>
              </div>

              <div class="script-scene">
                <h4>SHOT 8</h4>
                <p class="scene-visual"><strong>VISUAL:</strong> She grips the cable, starts her reps.</p>
                <blockquote class="scene-audio">"Resistance training that goes all the way up to 75 kilos."</blockquote>
              </div>

              <div class="script-scene">
                <h4>SHOT 9</h4>
                <p class="scene-visual"><strong>VISUAL:</strong> (no cut, continuous) She’s now struggling with her reps. Weight drops automatically, she finishes cleanly, turns to camera with a slight smile.</p>
                <blockquote class="scene-audio">"And it even has a burnout mode that automatically reduces the weight when you’re struggling"</blockquote>
              </div>

              <div class="script-scene">
                <h4>SHOT 10</h4>
                <p class="scene-visual"><strong>VISUAL:</strong> Close up on her face.</p>
                <blockquote class="scene-audio">"Honestly, I am just glad I finally found a way to train at home, without compromising anything."</blockquote>
              </div>

              <div class="script-scene">
                <h4>SHOT 11</h4>
                <p class="scene-visual"><strong>VISUAL:</strong> She takes a sip of water, bottle will be in her hand, then she looks at camera</p>
                <blockquote class="scene-audio">"If you’re tired of feeling uncomfortable every time you walk into a gym, go check out Aroleap X"</blockquote>
              </div>

              <div class="script-scene">
                <h4>FINAL SHOT</h4>
                <p class="scene-visual"><strong>VISUAL:</strong> She turns back to Aroleap, grabs the cable, looks back over her shoulder.</p>
                <blockquote class="scene-audio">"Now, if you will excuse me, I have sets to finish."</blockquote>
              </div>
            </div>
        `,
        'script2': `
            <div class="script-content">
              <h2 class="script-headline">YouTube Ad Hook & Script</h2>
              
              <div class="script-scene">
                <h4>SCENE START - Pacing: Fast, Energetic</h4>
                <p class="scene-visual"><strong>VISUAL:</strong> Speaker directly to camera, holding up a smartphone showing a 0-balance graph.</p>
                <blockquote class="scene-audio"><strong>AUDIO (Hook, 0:00 - 0:05):</strong> Stop scrolling. If your course isn't generating $10k a month, your offer is broken. Not your ads. Your offer.</blockquote>
              </div>

              <div class="script-scene">
                <h4>SCENE TWO</h4>
                <p class="scene-visual"><strong>VISUAL:</strong> Text overlay pops: 'FIX YOUR OFFER'. Speaker points to link below.</p>
                <blockquote class="scene-audio"><strong>AUDIO (0:05 - 0:15):</strong> I'm hosting a live workshop tomorrow showing you exactly how to restructure your offer to compel instant action. Click the link to register.</blockquote>
              </div>
            </div>
        `
    };

    // Open script/email modals
    if(modal) {
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const contentId = trigger.getAttribute('data-modal');
                if (modalContentMap[contentId]) {
                    modalBody.innerHTML = modalContentMap[contentId];
                } else {
                    modalBody.innerHTML = "<p>Content not found.</p>";
                }
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
                
                // Reset progress bar on open
                if (progressBar) progressBar.style.width = '0%';
                
                // Allow modal to render before calculating scrollHeight
                setTimeout(updateProgressBar, 50);
            });
        });

        // Reading Progress Bar Logic
        const updateProgressBar = () => {
            if (!progressBar || !modalBody) return;
            
            // maxScroll is the total scrollable height minus the visible container height
            const maxScroll = modalBody.scrollHeight - modalBody.clientHeight;
            
            if (maxScroll <= 0) {
                // If content fits completely without scrolling, fill the bar
                progressBar.style.width = '100%';
                return;
            }
            
            const currentScroll = modalBody.scrollTop;
            const scrollPercentage = (currentScroll / maxScroll) * 100;
            progressBar.style.width = scrollPercentage + '%';
        };

        // Attach scroll listener strictly to the modal body
        modalBody.addEventListener('scroll', updateProgressBar);
    }

    // Open video modals
    if(videoModal) {
        videoTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const videoId = trigger.getAttribute('data-video');
                if (videoContentMap[videoId]) {
                    videoBody.innerHTML = videoContentMap[videoId];
                } else {
                    videoBody.innerHTML = "<p style='color: white; padding: 20px;'>Video not found.</p>";
                }
                videoModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
    }

    // Shared close logic
    const closeAllModals = () => {
        if (modal) modal.classList.remove('active');
        if (videoModal) {
            videoModal.classList.remove('active');
            // Stop video playback by clearing innerHTML
            videoBody.innerHTML = '';
        }
        document.body.style.overflow = '';
    };

    closeBtns.forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });

    // Close on outside click
    window.addEventListener('click', (e) => {
        if(e.target === modal || e.target === videoModal) {
            closeAllModals();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape') {
            closeAllModals();
        }
    });

});
