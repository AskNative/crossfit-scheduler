import Resolver from 'ember/resolver';

var resolver = Resolver.create();

resolver.namespace = {
  modulePrefix: 'crossfit-scheduler',
  podModulePrefix: 'crossfit-scheduler/pods'
};

export default resolver;
