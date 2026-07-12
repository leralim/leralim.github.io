function showabout(){
    $("#about_container").css("display","inherit");
    $("#about_container").addClass("animated slideInLeft");
    setTimeout(function(){
        $("#about_container").removeClass("animated slideInLeft");
    },800);
}
function closeabout(){
    $("#about_container").addClass("animated slideOutLeft");
    setTimeout(function(){
        $("#about_container").removeClass("animated slideOutLeft");
        $("#about_container").css("display","none");
    },800);
}
function showwork(){
    $("#work_container").css("display","inherit");
    $("#work_container").addClass("animated slideInRight");
    setTimeout(function(){
        $("#work_container").removeClass("animated slideInRight");
    },800);
}
function closework(){
    $("#work_container").addClass("animated slideOutRight");
    setTimeout(function(){
        $("#work_container").removeClass("animated slideOutRight");
        $("#work_container").css("display","none");
    },800);
}
function showcontact(){
    $("#contact_container").css("display","inherit");
    $("#contact_container").addClass("animated slideInUp");
    setTimeout(function(){
        $("#contact_container").removeClass("animated slideInUp");
    },800);
}
function closecontact(){
    $("#contact_container").addClass("animated slideOutDown");
    setTimeout(function(){
        $("#contact_container").removeClass("animated slideOutDown");
        $("#contact_container").css("display","none");
    },800);
}
function showWorkTab(tab){
    $(".work-tab").removeClass("active");
    $(".work-tab[data-target='work-tab-" + tab + "']").addClass("active");
    $(".work-panel").removeClass("active");
    $("#work-tab-" + tab).addClass("active");
}
function showWorkPreview(tab){
    showWorkTab(tab);
}
setTimeout(function(){
    $("#loading").addClass("animated fadeOut");
    setTimeout(function(){
      $("#loading").removeClass("animated fadeOut");
      $("#loading").css("display","none");
      $("#box").css("display","none");
      $("#about").removeClass("animated fadeIn");
      $("#contact").removeClass("animated fadeIn");
      $("#work").removeClass("animated fadeIn");
    },1000);
},1500);

// Contact form handling
$(function(){
    showWorkTab('all');

    function fallbackMailto(name, email, message){
        var subject = encodeURIComponent('Website message from ' + name);
        var body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);
        window.location.href = 'mailto:leralim.jy@gmail.com?subject=' + subject + '&body=' + body;
    }

    $('#contactForm').on('submit', function(e){
        e.preventDefault();
        var name = $('#cf-name').val().trim();
        var email = $('#cf-email').val().trim();
        var message = $('#cf-message').val().trim();
        $('#contact-status').text('Sending...');
        if(!name || !email || !message){
            $('#contact-status').text('Please complete all fields.');
            return;
        }

        // If EmailJS is configured, it can send directly from the client.
        // To enable: sign up at https://www.emailjs.com/, create a service and template,
        // then replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' below and include
        // the EmailJS SDK script in index.html. Do NOT commit your user ID publicly.
        if(window.emailjs && emailjs.send){
            emailjs.send('YOUR_SERVICE_ID','YOUR_TEMPLATE_ID', {
                from_name: name,
                from_email: email,
                message: message,
                to_email: 'leralim.jy@gmail.com'
            }).then(function(){
                $('#contact-status').text('Message sent — thank you!');
                $('#contactForm')[0].reset();
            }, function(err){
                $('#contact-status').text('Send failed; opening email client.');
                fallbackMailto(name,email,message);
            });
        } else {
            // Fallback: open user's default mail client with prefilled message
            fallbackMailto(name,email,message);
        }
    });
});
