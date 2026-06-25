$file = 'c:\Users\DELL\OneDrive\Desktop\hynastudio-1\index.html'
$lines = [System.IO.File]::ReadAllLines($file, [System.Text.Encoding]::UTF8)

# Find the nav-dropdown div in the HTML body (not CSS)
# We know it's around line 3461 (0-indexed: 3460)
# Let's find it by searching for exact line patterns

$foundStart = -1
for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i].TrimStart() -eq '<div class="nav-dropdown">') {
        $foundStart = $i
        Write-Host "Found nav-dropdown at line $($i+1): '$($lines[$i])'"
    }
}

if ($foundStart -eq -1) {
    Write-Host "Could not find nav-dropdown div"
    # Show lines around the area
    for ($i = 3458; $i -lt 3465; $i++) {
        Write-Host "Line $($i+1): '$($lines[$i])'"
    }
} else {
    Write-Host "All instances found. Checking for Saas Solution nearby..."
    # The one we want is the one with 'Saas Solution' nearby
    $targetStart = -1
    for ($i = 0; $i -lt $lines.Count; $i++) {
        if ($lines[$i].TrimStart() -eq '<div class="nav-dropdown">') {
            # Check next 5 lines for 'Saas Solution'
            for ($j = $i+1; $j -lt [math]::Min($i+6, $lines.Count); $j++) {
                if ($lines[$j] -match 'Saas Solution') {
                    $targetStart = $i
                    Write-Host "Target nav-dropdown found at line $($i+1)"
                    break
                }
            }
        }
    }
    
    if ($targetStart -ge 0) {
        # Find the end of this nav-dropdown (closing </div>)
        $depth = 0
        $targetEnd = -1
        for ($i = $targetStart; $i -lt $lines.Count; $i++) {
            if ($lines[$i] -match '<div') { $depth++ }
            if ($lines[$i] -match '</div>') { $depth-- }
            if ($depth -eq 0) {
                $targetEnd = $i
                Write-Host "nav-dropdown ends at line $($i+1)"
                break
            }
        }
        
        if ($targetEnd -ge 0) {
            # Insert divider: find the line with 'Data & AI' and insert before it
            $dividerInserted = $false
            for ($i = $targetStart; $i -le $targetEnd; $i++) {
                if ($lines[$i] -match 'Data.*AI') {
                    # Check if there's already a divider line just before
                    $hasDivider = $false
                    for ($k = [math]::Max(0,$i-3); $k -lt $i; $k++) {
                        if ($lines[$k] -match 'nav-dropdown-divider') {
                            $hasDivider = $true
                            break
                        }
                    }
                    if (-not $hasDivider) {
                        # Insert divider and label before this line
                        $dividerLine = '        <hr class="nav-dropdown-divider">'
                        $labelLine = '        <span class="nav-dropdown-group-label">Digital &amp; Data</span>'
                        $newLines = [System.Collections.Generic.List[string]]::new($lines)
                        $newLines.Insert($i, $labelLine)
                        $newLines.Insert($i, $dividerLine)
                        $lines = $newLines.ToArray()
                        Write-Host "Divider inserted before line $($i+1)"
                        $dividerInserted = $true
                    } else {
                        Write-Host "Divider already present near 'Data & AI'"
                    }
                    break
                }
            }
            
            # Also add "Solutions" label after the opening <div class="nav-dropdown">
            $labelInserted = $false
            if ($lines[$targetStart+1].TrimStart() -notmatch 'nav-dropdown-group-label') {
                $solutionsLabel = '        <span class="nav-dropdown-group-label">Solutions</span>'
                $newLines2 = [System.Collections.Generic.List[string]]::new($lines)
                $newLines2.Insert($targetStart+1, $solutionsLabel)
                $lines = $newLines2.ToArray()
                Write-Host "Solutions label inserted"
                $labelInserted = $true
            } else {
                Write-Host "Solutions label already present"
            }
            
            if ($dividerInserted -or $labelInserted) {
                [System.IO.File]::WriteAllLines($file, $lines, [System.Text.Encoding]::UTF8)
                Write-Host "File saved successfully!"
            } else {
                Write-Host "No changes needed."
            }
        }
    }
}
