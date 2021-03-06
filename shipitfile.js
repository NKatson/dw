module.exports = function (shipit) {
    require('shipit-deploy')(shipit);
    require('shipit-npm')(shipit);

    shipit.initConfig({
        default: {
            workspace: '/tmp/frontend',
            repositoryUrl: 'git@github.com:DailyWorth/dailyworth-client.git',
            ignores: ['.git', 'node_modules', 'static/dist', 'webpack-assets.json'],
            rsync: ['--del'],
            keepReleases: 5,
            shallowClone: true
        },
        staging: {
            deployTo: '/var/www/dev.worthfm.com/frontend',
            branch: 'develop',
            servers: 'deploy@worthfm.4xxi.com'
        },
        uat: {
            deployTo: '/var/www/uat.worthfm.com/frontend',
            branch: 'master',
            servers: 'deploy@worthfm.4xxi.com'
        }
    });

    shipit.blTask('build', function () {
        return shipit.remote('cd ' + this.config.deployTo + '/current && npm run build');
    });

    shipit.blTask('run-server', function () {
        return shipit.remote('cd ' + this.config.deployTo + '/current && pm2 start ' + this.options.environment + '_app.json');
    });

    shipit.blTask('images', function () {
      var src = this.config.deployTo;
      return shipit.remote('cp -r ' + src + '/current/static/images/banks ' + src + '/current/static/dist');
    })

    shipit.blTask('run', ['deploy', 'build', 'images', 'run-server'], function () {
        return shipit.remote('echo "Done!"');
    });
};
