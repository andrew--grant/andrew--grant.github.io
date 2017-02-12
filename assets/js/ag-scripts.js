$(document).ready(
    function () {


        // submit form through formspree service

        $('#contact-form').submit(function (e) {
            e.preventDefault();
            var btnSubmit = '#contact-form input[type=submit]';
            // todo
            $(btnSubmit).val('Hold tight, sending...').prop('disabled', true);
            $('#contact-form-feedback').fadeIn();

            $.ajax({
                url: 'https://formspree.io/andrewgrant@hotmail.com',
                type: 'post',
                dataType: 'json',
                data: $('#contact-form').serialize(),
                success: function (data) {
                    console.log(data);
                    $(btnSubmit).val('Message sent!').prop('disabled', false);
                }
            });
        });


    }
)





//
// #monogram-header {
//     /*height: 2em;*/
//     /*margin-top: 4em;*/
// }
//
// #contact-form input[type=submit][disabled] {
//     /*cursor: default;*/
//     background-color: #5b6ba6;
//     opacity: 1;
//     color: #ffffff;
// }
//
// section#footer > .inner {
//     /* display: none !important; */
//     /* applies to whole form */
// }