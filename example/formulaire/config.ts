import { startup } from '../../dist/artist';
import { ILayout } from './layout/layout';

startup((config) => {
    config.container = "[layout]";
    config.route = () => {
        return new Promise((resolve) => resolve(ILayout));
    }
});

