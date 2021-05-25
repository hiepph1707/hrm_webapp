pipeline {

    agent none
    //agent {label 'master'}
    
    environment {
        PASS = credentials('sgb-hub-pass')
	    APP_VERSION = "${BUILD_ID}"
        APP_ENV = "${BRANCH_NAME}"
    }
    
    // parameters {
    //     choice(name: 'DEPLOY_TAG', choices: ['dev', 'prod'], description: 'Deploy Environment')
    // }

    stages {

        stage('Build') {
            agent {label 'master'}
            steps {
                sh '''
                    ./jenkins/build/build.sh $
                '''
            }

        }

        stage('Push') {
            agent {label 'master'}
            steps {
                sh './jenkins/push/push.sh'
            }
        }

        stage('Deploy to UAT') {
            when {
                branch 'dev' 
	    }
            agent {label 'ho-srv-chat-dev'}
            steps {
                echo "****** Deploy to ${BRANCH_NAME} branch ******"
                sh './jenkins/deploy/deploy.sh'
            }
        }

        stage('Deploy to Production') {
            when {
                branch 'main' 
	    }
            agent {label 'master'}
            steps {
                echo "****** Deploy to ${BRANCH_NAME} branch ******"
                sh './jenkins/deploy/deploy.sh'
            }
        }
    }
    
    post {
        always {
            rocketSend "${env.JOB_NAME} - Build #${env.BUILD_NUMBER} [${currentBuild.currentResult}] (<${env.BUILD_URL}|Open>)"
        }
    }
}
