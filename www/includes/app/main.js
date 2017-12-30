jQuery(document).ready(function ($) {

    const RESTURL = 'https://csademo.orangehousellc.com/wp-json/'

    var app = {
        
        init : function() {
            
            this.getSiteData()
            //this.loadPosts()
            this.loadPages()
            this.loadCategories()
            this.loadEvents()
            
        },
        
        loadEvents : function() {
            
            $( '#main-content' ).on( 'click', '.blog-post h3', this.loadSinglePost )
            $( '#main-content' ).on( 'click', '.blog-post .thumbnail', this.loadSinglePost )
            
        },
        
        getSiteData : function() {
            
            $.get( RESTURL )
                .done( function( response ) {
                    $( '.site-title' ).html( response.name )
                    $( '.description' ).html( response.description )
                })
                .fail( function() {
                    alert( 'Failed to retreive data. Make sure you have an data connection' )
                })

        },
        
        loadPosts : function() {
            
            var url = RESTURL + 'wp/v2/posts?_embed=true/&categories=129'
            
            $.get( url )
                .done( function( response ) {
                    
                    var posts = {
                        posts: response
                    }
                    
                    var template = $( '#blog-post-template' ).html()
                    var output = $( '#main-content' )
                                        
                    var result = Mustache.to_html( template, posts )
                    output.append( result )
                    
                })
                .fail( function() {
                    alert( 'cannot load posts' )
                })
            
        },

          loadPages : function() {
            
            var url = RESTURL + 'wp/v2/pages?_embed=true/&exclude=12, 48,2,772,1811,696,2187,2213,2180,2248'
            
            $.get( url )
                .done( function( response ) {
                    
                    var posts = {
                        posts: response
                    }
                    
                    var template = $( '#blog-post-template' ).html()
                    var output = $( '#main-content' )
                                        
                    var result = Mustache.to_html( template, posts )
                    output.append( result )
                    
                })
                .fail( function() {
                    alert( 'cannot load pages' )
                })
            
        },
        
        loadCategories : function() {
            
            var url = RESTURL + 'wp/v2/categories'
            
            $.get( url )
                .done( function( response ) {
                    
                    var categories = {
                        categories : response
                    }
                    
                    var template = $( '#blog-categories-template' ).html()
                    var output = $( '#categories' )
                                        
                    var result = Mustache.to_html( template, categories )
                    output.append( result )
                    
                })
                .fail( function() {
                    alert( 'cannot load categories' )
                })
            
        },
        
        loadSinglePost : function() {
            
            var id = Math.abs( $( this ).parent( '.blog-post' ).data( 'id' ) )
            
            //For posts the line below should be var url = RESTURL + 'wp/v2/posts/' + id + '?_embed'

            var url = RESTURL + 'wp/v2/pages/' + id + '?_embed'
            
            $.get( url )
                .done( function( response ) {

                    
                    var template = $( '#single-post-template' ).html()
                    var output = $( '#main-content' )
                                        
                    var result = Mustache.to_html( template, response )
                    output.html( result )
                    
                })
                .fail( function() {
                    alert( 'Cannot load this vegetable' )
                })
            
        }
   
        
    }

    app.init();

});
