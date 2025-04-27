function GoBackWithRefresh(event) {
    if ('referrer' in document) {
        window.location = document.referrer;
        /* OR */
        //location.replace(document.referrer);
    } else {
        window.history.back();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Accordion Functionality
    const accordionButtons = document.querySelectorAll('.accordion-button');

    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const target = document.querySelector(this.getAttribute('data-target'));
            const isExpanded = this.getAttribute('aria-expanded') === 'true';

            // Close all items
            if(!isExpanded) {
                document.querySelectorAll('.accordion-collapse').forEach(item => {
                    item.classList.remove('show');
                });
                accordionButtons.forEach(btn => {
                    btn.setAttribute('aria-expanded', 'false');
                });
            }

            // Toggle current item
            target.classList.toggle('show', !isExpanded);
            this.setAttribute('aria-expanded', String(!isExpanded));
        });
    });

    // Navigation button click handler
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if(!this.href) return;
            e.preventDefault();
            document.querySelector('.content-page').classList.add('page-exit');
            setTimeout(() => {
                window.location.href = this.href;
            }, 500);
        });
    });
});
