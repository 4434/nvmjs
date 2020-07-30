<template>
    <div id="three" ref="three">
    </div>
</template>
<script>
import * as THREE from 'three';
export default {
    data () {
        return {

        }
    },
    mounted () {
        let box = this.$refs.three;
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 75, box.offsetWidth/box.offsetHeight, 0.1, 1000 );

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize( box.offsetWidth, box.offsetHeight );
        this.$refs.three.appendChild( renderer.domElement );

        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        var cube = new THREE.Mesh( geometry, material );
        scene.add( cube );

        camera.position.z = 5;

        var animate = function () {
            requestAnimationFrame( animate );
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            renderer.render( scene, camera );
        };

        animate();        
    }

}
</script>
<style lang="scss" scoped>
    #three{
        width: 100%;
        height: 100%;
        canvas{
            width: 100%;
            height: 100%;
        }
    }
</style>