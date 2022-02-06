FROM node:16-alpine 

RUN apk update && apk add --no-cache tini
ARG port=3001
ARG nodeEnv=production
ARG hostName=pawn.dev

ENV PORT=${port} \
    NODE_ENV=${nodeEnv} \
    HOST=${hostName}

WORKDIR /usr/src/app

ADD --chown=node:node . . 

RUN npm ci --loglevel verbose --no-audit

HEALTHCHECK --interval=30s \
    --timeout=2s \
    --retries=10 \
    CMD node bin/healthcheck.js

USER node

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["npm", "start"]