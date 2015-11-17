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

    shipit.blTask('stop-server', function () {
        return shipit.remote('cd /home/deploy/frontend/current && pm2 stop ./bin/server.js');
    });

    shipit.blTask('run-server', function () {
        return shipit.remote('cd /home/deploy/frontend/current && NODE_ENV=production HOST=worthfm.4xxi.com PORT=8080 API_HOST=worthfm.4xxi.com pm2 start ./bin/server.js');
    });

    shipit.blTask('run', ['stop-server', 'deploy', 'build', 'run-server'], function () {
        return shipit.remote('echo "Done!"');
    });
};
