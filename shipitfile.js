module.exports = function (shipit) {
    require('shipit-deploy')(shipit);
    require('shipit-npm')(shipit);

    shipit.initConfig({
        default: {
            workspace: '/tmp/frontend',
            deployTo: '/home/deploy/frontend',
            branch: 'develop',
            repositoryUrl: 'git@github.com:DailyWorth/dailyworth-client.git',
            ignores: ['.git', 'node_modules', 'static/dist', 'webpack-assets.json'],
            rsync: ['--del'],
            keepReleases: 2,
            shallowClone: true
        },
        staging: {
            servers: 'deploy@worthfm.4xxi.com'
        }
    });

    shipit.blTask('build', function () {
        return shipit.remote('cd /home/deploy/frontend/current && npm run build');
    });

    shipit.blTask('run-server', function () {
        return shipit.remote('cd /home/deploy/frontend/current && pm2 start prod_app.json');
    });

    shipit.blTask('run', ['deploy', 'build', 'run-server'], function () {
        return shipit.remote('echo "Done!"');
    });
};
