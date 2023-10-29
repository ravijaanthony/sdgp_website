
$(function () {
    'use strict';
    
    const elements = {
        scrollify: $('.js--scrollify'),
        header: $('.js--header'),
        footer: $('.js--footer'),
        navigate: $('.js--navigate'),
        navigateItems: $('.js--navigate-items'),
        navigateLink: $('.js--navigate-link'),
        firstTitle: $('.js--first-title'),
        third: $('.js--third'),
        thirdTitle: $('.js--third-title'),
        thirdLeft: $('.js--third-left'),
        thirdRight: $('.js--third-right'),
        sectionCard: $('.js--section-card'),
        block: $('.js--block'),
        more: $('.js--more'),
    };
    
    elements.navigateItems.on('click', '.js--navigate-link', (ev) => {
        ev.preventDefault();
        
        const $this = $(ev.currentTarget);
        const hash = $this.attr('href');
        
        $.scrollify.move(hash);
    });
    
    elements.more.on('click', (ev) => {
        elements.block.slideToggle();
    });
    
    setTimeout( () => {
        elements.firstTitle.addClass('bounceInDown');
    }, 100);
    
    $.scrollify({
        section: '.js--scrollify',
		sectionName : 'section-name',
        overflowScroll: false,
        setHeights: true,
        interstitialSection: '.footer, .section__fourth',
        standardScrollElements: '.footer',
		before (index, sections) {
            const ref = sections[index].data('section-name');
            
            if ( ref === 'first' || ref === 'footer' ) {
                elements.header.removeClass('is--active');
                elements.firstTitle.addClass('bounceInDown');
            }
            
            if ( ref === 'second' ) {
                setTimeout( function () {
                    elements.sectionCard.addClass('flipInY');
                }, 100);
            }
            
            if ( ref === 'third' ) {
                elements.third.removeClass('is--inactive');
                elements.thirdLeft.addClass('fadeInLeft');
                elements.thirdRight.addClass('fadeInRight');
                elements.thirdTitle.addClass('bounceInDown');
            }
            
            if ( ref === 'footer' ) {
                elements.navigate.addClass('is--inactive');
            } else {
                elements.navigate.removeClass('is--inactive');
            }
            
            elements.navigateLink.parent().siblings().find('.js--navigate-link').removeClass('is--active');
            elements.navigateLink.eq(index).addClass('is--active');
        },
		after: function (index, sections) {
            var ref = sections[index].data('section-name');
            
            if ( ref !== 'second' ) {
                elements.sectionCard.removeClass('flipInY');
            }
            
            if ( ref === 'third' ) {
                elements.thirdLeft.removeClass('fadeInLeft');
                elements.thirdRight.removeClass('fadeInRight');
                elements.thirdTitle.removeClass('bounceInDown');
            }
            
            if ( ref !== 'third' ) {
                elements.third.addClass('is--inactive');
            }
            
            if ( ref !== 'first' && ref !== 'footer' ) {
                elements.header.addClass('is--active');
                elements.firstTitle.removeClass('bounceInDown');
            }
        },
        afterRender () {},
    });
});