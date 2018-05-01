import * as $ from 'node_modules/jquery/dist/jquery';

export function dom(option: { in: (e: Event) => void, out: (e: Event) => void }) {
    return (element, serviceProvider) => {
        var $element = $(element);
        $element.on('custom:view:dom:remove', (e) => {
            if (e.target === e.currentTarget) {
                option.out(e);
            }
        });

        $element.on('custom:view:dom:added', (e) => {
            if (e.target === e.currentTarget) {
                option.in(e);
            }
        });

        return () => {};
    };
}