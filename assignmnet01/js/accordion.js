// jQuery Accordion - Version 02

const $tabs = $(".tab");
const $content = $(".content");

// Hide the content elements on page load
$content.hide();

// Accordion
$tabs.click(function () {
  /*
    if the user is clicking the tab for 
    content that is alraedy visible, slide it up
    */
  if ($(this).next().is(":visible")) {
    $(this).next().slideUp();
  } else {
    //otherwise, close all content
    $content.slideUp();
    //and open the chosen content
    $(this).next().slideDown();
  }
});
